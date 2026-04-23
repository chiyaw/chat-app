import React from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'

function ReceiverMessage({ image, message }) {
  let scroll = useRef(null)
  useEffect(()=>{
    scroll?.current.scrollIntoView({behavior:'smooth'})
  },[message,image])

  const handleImageScroll=()=>{
    scroll?.current.scrollIntoView({behavior:'smooth'})
  }


  return (
    <div ref={scroll} className='w-fit max-w-125 bg-[#408a78] px-5 py-2.5 rounded-tl-none rounded-2xl mr-auto mx-5 text-white relative right-0 shadow-gray-400 shadow-2xl gap-2.5 flex flex-col'>
          <div ref={scroll} >
          {image && <img src={image} alt='img' onLoad={handleImageScroll} className='w-40 rounded-2xl'/> }
            {message && <span >{message}</span> }
          </div>
          </div>
  )
}

export default ReceiverMessage