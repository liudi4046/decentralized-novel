

export default function Comment({ isVisible }:{isVisible:boolean}) {



  return (
    <>
    {isVisible ? 
    <div className="flex flex-col bg-blue-100 w-1/5">
      <div className="text-lg p-5 justify-between">
        <div>
          Comments
        </div>
        <div>
          fsad
        </div>
      </div>
      <div className="flex-1 min--0 overflow-auto">
        <div style={
          {
            height: '1000px'
          }
        } className="">

        </div>
      </div>
      <div className="bg-blue-50 p-5">
        <input className="w-full outline-none bg-gray-200 p-1 rounded-md" />
      </div>

    </div> : null}
    </>
    
    
  )
}
