import CloseIcon from '@mui/icons-material/Close';
export default function Comment({ commentData }:{commentData:object}) {
    return <div className="px-2.5 py-1.5 w-full">
        <div className="text-gray-500 overflow-wrap break-words text-sm leading-tight pr-2">
            {commentData.address}
        </div>
        <div className="text-md mt-1 text-gray-700">{commentData.content}</div>
        <div className="flex justify-between">
            <div className="text-xs mt-0.5  text-gray-400">{commentData.time}</div>
            <CloseIcon className="scale-75 hidden text-gray-400"></CloseIcon>
        </div>
    </div>
}