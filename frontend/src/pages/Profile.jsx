import React, { useRef, useState } from 'react'
import dp from '../assets/dp.webp'
import { IoCameraOutline } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SERVERURL, SAVING } from '../../constant';
import { setUserData } from '../redux/userSlice';
import axios from "axios"

function Profile() {
    let {userData} = useSelector(state=>state.user)
    let navigate = useNavigate()
    let dispatch = useDispatch()

    let [name, setName] = useState(userData.name || "")
    let [frontendImage, setFrontendImage] = useState(userData.image || dp)
    let [backendImage, setBackendImage] = useState(null)

    let image=useRef()
    let [saving,setSaving] = useState(false)

    const handleImage = (e) => {
        let file = e.target.files[0]
        setBackendImage(file)
        setFrontendImage(URL.createObjectURL(file))
    }

    const handleProfile = async (e) => {
        e.preventDefault()
        setSaving(true)
        try {
            let formData=new FormData()
            formData.append("name",name)
            if(backendImage) {
                 formData.append("image",backendImage)
            }

            let result = await axios.put(`${SERVERURL}/api/user/profile`, formData, {withCredentials:true})
            setSaving(false)
            console.log(result.data)
            dispatch(setUserData(result.data))
            navigate("/")
            
        } catch (error) {
            console.log(error.response?.data || error.message)
            setSaving(false)
        }
    }



    return (
        <div className='w-full h-screen bg-[#d5f4ec] flex flex-col items-center justify-center gap-10'>

            <div onClick={()=>navigate("/")}  className='fixed top-5 left-5 cursor-pointer'>
                <IoIosArrowBack className=' h-8 w-8 text-gray-600' />
            </div>

            <div onClick={()=>image.current.click()} className= 'bg-white rounded-full border-5 border-[#869c96] shadow-gray-500  shadow-2xl relative '>

                <div className=' w-50 h-50 rounded-full overflow-hidden flex justify-center items-center'>
                    <img src={frontendImage} className='w-full h-full object-cover' />
                </div>
                
                <IoCameraOutline className='absolute bottom-0 right-7 w-10 h-10 text-gray-800 bg-[#869c96] rounded-full p-1 shadow-gray-500 shadow-lg' />
            </div>
            <form onSubmit={handleProfile} className='w-[95%] max-w-125 flex flex-col gap-5 items-center justify-center'>
                <input type='file' accept='image/*' ref={image} hidden onChange={handleImage}/>
            <input type='text' placeholder='Enter Your Name' onChange={(e)=>setName(e.target.value)} value={name} className='w-[90%] h-12.5 outline-none border-2 border-[#77c8b4] px-5 py-2.5 bg-white rounded-2xl shadow-gray-400 shadow-lg'/>
            <input type='text' readOnly value={userData?.userName} className='w-[90%] h-12.5 outline-none border-2 border-[#77c8b4] px-5 py-2.5 bg-white rounded-2xl shadow-gray-400 shadow-lg text-gray-500'/>
            <input type='text' readOnly value={userData?.email} className='w-[90%] h-12.5 outline-none border-2 border-[#77c8b4] px-5 py-2.5 bg-white rounded-2xl shadow-gray-400 shadow-lg text-gray-500 '/>
            <button className='px-5 py-2.5 bg-[#77c8b4] rounded-2xl shadow-gray-300 shadow-lg w-50 mt-5 font-semi-bold hover:shadow-inner ' disabled={saving} >{saving?SAVING:'Save Profile'}</button>
            </form>
        </div>
    )
}

export default Profile