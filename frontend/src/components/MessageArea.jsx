import React, { useEffect, useRef, useState } from 'react';
import dp from '../assets/dp.webp'
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';
import { RiEmojiStickerLine } from "react-icons/ri";
import { FaImages } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";
import EmojiPicker from 'emoji-picker-react';
import SenderMessage from './SenderMessage.jsx';
import ReceiverMessage from './ReceiverMessage.jsx';
import { SERVERURL } from '../../constant.jsx';
import axios from 'axios';
import { setMessages } from '../redux/messageSlice.js';

function MessageArea() {

    let { selectedUser, userData } = useSelector(state => state.user)
    let dispatch = useDispatch()
    let [showPicker, setShowPicker] = useState(false)
    let [input, setInput] = useState("")
    let [frontendImage, setFrontendImage] = useState(null)
    let [backendImage, setBackendImage] = useState(null)
    let image = useRef()
    let {messages} = useSelector(state=>state.message)
    let [loading, setLoading] = useState(false)

    const handleSendMessage = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
    let formData=new FormData()
    formData.append("message",input)
    if(backendImage){
      formData.append("image",backendImage)
    }
    let result=await axios.post(`${SERVERURL}/api/message/send/${selectedUser._id}`,formData,{withCredentials:true})
    setLoading(false)
            dispatch(setMessages([...messages, result.data.message]))
            setInput("")
            setFrontendImage(null)
            setBackendImage(null)
        } catch (error) {
            setLoading(false)
            console.log("handleSendMessage error", error)
        }
    }


    const onEmojiClick = (emojiData) => {
        setInput(prevInput => prevInput + emojiData.emoji)
        setShowPicker(false)
    }

    const handleImage = (e) => {
        let file = e.target.files[0]
        setBackendImage(file)
        setFrontendImage(URL.createObjectURL(file))
    }




    return (

        <div className={`${selectedUser ? 'flex' : 'hidden'} relative lg:flex lg:w-[70%] w-full h-screen bg-[#d5f4ec] overflow-hidden  `}  >

            {selectedUser &&
                <div className='w-full h-screen flex flex-col overflow-hidden gap-5 items-center'>
                    <div className='w-full h-25 bg-[#408a78] rounded-b-[30px] shadow-gray-400 shadow-2xl  justify-start items-center px-5 flex flex-row gap-5'>
                        <div onClick={() => dispatch(setSelectedUser(null))} className='cursor-pointer'>
                            <IoIosArrowBack className=' h-8 w-8 text-white' />
                        </div>
                        <div className=' w-12.5 h-12.5  rounded-full overflow-hidden flex justify-center items-center shadow-gray-700 shadow-lg'>
                            <img src={selectedUser?.image || dp} className='h-full' />

                        </div>
                        <h1 className='text-white font-semibold text-[20px]'>{selectedUser?.userName || ' User'}</h1>
                    </div>
                    <div className='w-full h-160 flex flex-col  py-7.5 overflow-auto gap-5  '>
                        {showPicker && <div className='absolute bottom-28 left-5 shadow-gray-500 shadow-2xl'><EmojiPicker onEmojiClick={onEmojiClick} width={250} height={350} /> </div>}


                        {messages?.map((mess)=>(
    mess.sender === userData._id
      ? <SenderMessage image={mess.image} message={mess.message}/>
      : <ReceiverMessage  image={mess.image} message={mess.message} />
))}

                    </div>
                </div>

            }
            {!selectedUser &&

                <div className='lg:flex  h-screen bg-[# d5f4ec] items-center justify-center flex flex-col '>
                    <h1 className='text-4xl text-[#30846f] font-semibold '>Welcome to <span className='text-[#30846f] text-5xl'>LITA</span></h1>
                    <span className='text-gray-500 text-xl'>Select a user to start chatting</span>
                </div>}

            {selectedUser && <div className='w-full lg:w-[70%] h-25 fixed bottom-5 flex items-center justify-center '>
                <img src={frontendImage} alt="" className='w-20 absolute bottom-25 right-[20%] rounded-lg shadow-gray-400 shadow-lg' />
                <form className='w-[95%] lg:w-[70%] h-15 bg-[#408a78] shadow-gray-400 shadow-lg rounded-full flex items-center gap-5 px-5 relative' onSubmit={handleSendMessage}>

                    <div onClick={() => setShowPicker(prev => !prev)}>
                        <RiEmojiStickerLine className='w-6.25 h-6.25 text-white cursor-pointer' />
                    </div>
                    <input type="file" accept="image/*" ref={image} hidden onChange={handleImage} />
                    <input type="text" className='w-full h-full px-2.5 outline-none border-0 text-[19px] text-white bg-transparent ' placeholder='Click to type your message...' onChange={(e) => setInput(e.target.value)} value={input} />
                    <div onClick={() => image.current.click()}>
                        <FaImages className='w-6.25 h-6.25 cursor-pointer text-white' />
                    </div>
                    {(input.length > 0 || backendImage != null) && (<button>
                        <IoIosSend className='w-6.25 cursor-pointer h-6.25 text-white' />
                    </button>)}

                </form>
            </div>}


        </div>
    )
}

export default MessageArea