
export default function Comment({ commentData }:{commentData:object}) {
    return <div class="px-2.5 py-1.5 w-full">
        <div class="text-gray-500 overflow-wrap break-words text-sm leading-tight pr-2">
            {commentData.address}
        </div>
        <div class="text-md mt-1 text-gray-700">{commentData.content}</div>
    </div>
}