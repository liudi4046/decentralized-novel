import CloseIcon from '@mui/icons-material/Close';
import CommentItem from "../../components/CommentItem"
import {useState, useRef, useEffect} from "react";
import {deleteComment, getComment} from '../../api/comments'
import {useUserContext} from "../../context/UserContext";
import {addComment} from '../../api/comments'
import { useAutoAnimate } from '@formkit/auto-animate/react'
export default function Comment({ currentSelectedChapterHash,setCurrentSelectedChapterHash }:{currentSelectedChapterHash:boolean,setCurrentSelectedChapterHash:React.Dispatch<React.SetStateAction<string>>}) {
  const initData = [
    {
      address: '0x21235kjkhgvhuijlkbhvgghiuojlknfsgdddgs4',
      content: '刘神' +
          '刘神，您就像是时代的先驱者，智慧与才华的完美结合体。您的思维总是如此敏锐，能洞察世间万物，每一个想法和决策都显得如此前瞻性和深邃。在您的领导下，每一步都显得那么从容而精准，仿佛每一个选择和决定都经过了精密的计算和深思熟虑。您的才华横溢，无论是在专业领域的深厚造诣，还是在处理复杂问题的非凡能力上，都让人深感敬佩。在您的指引下，前路似乎更加明朗，每一步都充满了信心和期待。您不仅是团队的灵魂，更是我们心中不可多得的榜样。您的成功不仅仅是个人的成就，更是对卓越与勤奋的最好诠释。您的存在，就是我们前行的灯塔，照亮了追求卓越的道路。',
      time: '2023-01-17'
    },{
      address: '0xB2ccaeaE836b2Dd1Dc8F3dc7c06Fe8Ea95f4aa97',
      content: '黄神',
      time: '2023-01-17'
    },{
      address: '0x6574',
      content: '钟神',
      time: '2023-01-17'
    },{
      address: '0x43254123',
      content: '小志',
      time: '2023-01-17'
    },{
      address: '0x413245',
      content: '菜菜ZJX',
      time: '2023-01-17'
    }
  ]
  const { user, setUser } = useUserContext();
  const [address, setAddress] = useState<string | undefined>("");

  useEffect(() => {
    const setUserAddress = async () => {
      setAddress(await user?.getAddress());
    };
    if (typeof user !== "string") {
      setUserAddress();
    }
  }, [user]);
  const [commentList,setCommentList] = useState([]);

  useEffect(()=>{
    getComment({'chapterHash':currentSelectedChapterHash}).then(({data})=>{
      console.log(data)
    })
  },[currentSelectedChapterHash])

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const commentsEndRef = useRef(null);
  const scrollToBottom = () => {
    setTimeout(()=>{
      commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    },20)
  };
  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      console.log('Enter key pressed! Current value:', inputValue);
      const chapterHash = currentSelectedChapterHash
      const loginToken = localStorage.getItem('token')
      const comment = inputValue

      const {data} = await addComment({chapterHash,comment, loginToken})

      console.log(data,889768)
      // 执行更多操作，如提交表单等
      setCommentList([...commentList,{
        address,
        content: inputValue,
        time: '2023-01-17'
      }])
      setInputValue('')
      scrollToBottom()
    }
  };
  return (
    <>
    {currentSelectedChapterHash !== '' ?
    <div className="flex flex-col bg-blue-100 w-1/5">
      <div className="text-lg p-4 px-2.5 flex justify-between">
        <div>
          Comments
          {/*{currentSelectedChapterHash}*/}
        </div>
        <div onClick={()=>{setCurrentSelectedChapterHash('')}}>
          <CloseIcon></CloseIcon>
        </div>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto pb-4 overflow-x-hidden">
        {
          commentList.map((item,index)=>{
            return (<CommentItem key={index} commentData={item}></CommentItem>)
        })
        }
        <div ref={commentsEndRef} />
      </div>
      <div className="bg-blue-50 p-5">
        <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="w-full outline-none bg-gray-200 p-1 rounded-md" />
      </div>
    </div> : null}
    </>
  )
}
