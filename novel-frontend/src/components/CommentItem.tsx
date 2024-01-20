import CloseIcon from '@mui/icons-material/Close';
import {useUserContext} from "../context/UserContext";
import {useEffect, useState} from "react";
import {deleteComment} from '../api/comments'
export default function CommentItem({ commentData, chapterHash,commentList, setCommentList }:{setCommentList:Function,commentList:Array<object>,commentData:object,chapterHash:string}) {
    const { user, setUser } = useUserContext();
    const [address, setAddress] = useState<string | undefined>("");

    const handleDeleteComment = async () =>{
        const commentId = commentData?.commentId
        const loginToken = localStorage.getItem('token')
        const res = await deleteComment({commentId,loginToken,chapterHash})

        const filteredComments = commentList.filter(comment => comment?.commentId !== commentId);
        setCommentList(filteredComments)

    }

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // 月份是从 0 开始的
        const day = date.getDate();
        return `${year}-${month}-${day}`;
    }

    useEffect(() => {
        const setUserAddress = async () => {
            setAddress(await user?.getAddress());
        };
        if (typeof user !== "string") {
            setUserAddress();
        }
    }, [user]);
    return <div className="comment-container px-2.5 py-1.5 w-full">
        <div className="text-gray-500 overflow-wrap break-words text-sm leading-tight pr-2">
            {commentData.walletAddress}
        </div>
        <div className="text-md mt-1 text-gray-700">{commentData.comment}</div>
        <div className="flex justify-between items-center">
            <div className="text-xs mt-0.5  text-gray-400 ">{ formatDate(commentData.timestamp) }</div>
            {address === commentData.walletAddress ? <CloseIcon onClick={handleDeleteComment} className="close-icon scale-75  text-gray-400"></CloseIcon> : null}

        </div>
    </div>
}