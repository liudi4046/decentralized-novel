import CloseIcon from '@mui/icons-material/Close';
import {useUserContext} from "../context/UserContext";
import {useEffect, useState} from "react";
import {deleteComment} from '../api/comments'
export default function Comment({ commentData }:{commentData:object}) {
    const { user, setUser } = useUserContext();
    const [address, setAddress] = useState<string | undefined>("");

    const handleDeleteComment = async () =>{
        const res = await deleteComment({commentId,loginToken,chapterHash})
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
            <div className="text-xs mt-0.5  text-gray-400 ">{commentData.timestamp}</div>
            {address === commentData.walletAddress ? <CloseIcon onClick={handleDeleteComment} className="close-icon scale-75  text-gray-400"></CloseIcon> : null}

        </div>
    </div>
}