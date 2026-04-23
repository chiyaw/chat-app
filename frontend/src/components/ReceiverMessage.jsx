import React from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import dp from '../assets/dp.webp'
import { useSelector } from 'react-redux'

function ReceiverMessage({ image, message }) {
  let scroll = useRef(null)
   let {selectedUser}=useSelector(state=>state.user)
  useEffect(() => {
    scroll?.current.scrollIntoView({ behavior: 'smooth' })
  }, [message, image])

  const handleImageScroll = () => {
    scroll?.current.scrollIntoView({ behavior: 'smooth' })
  }


  return (
    <div className='flex items-start'>
      <div className='w-7 h-7 rounded-full overflow-hidden flex justify-center items-center bg-white cursor-pointer shadow-gray-500 shadow-lg ' >
         <img src={selectedUser.image || dp} alt="" className='h-full w-full object-cover'/>
         </div>
      <div ref={scroll} className='w-fit max-w-125 bg-[#408a78] px-5 py-2.5 rounded-tl-none rounded-2xl mr-auto mx-2.5 text-white relative right-0 shadow-gray-400 shadow-2xl gap-2.5 flex flex-col' >

        {image && <img src={image} alt='img' onLoad={handleImageScroll} className='w-40 rounded-2xl' />}
        {message && <span >{message}</span>}
      </div>
      
    </div>
  )
}

export default ReceiverMessage