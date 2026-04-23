import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dp from '../assets/dp.webp'
import { IoMdSearch } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { RiLogoutCircleLine } from "react-icons/ri";
import { SERVERURL } from '../../constant';
import axios from 'axios';
import { setOtherUsers, setSearchData, setSelectedUser, setUserData } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';



function SideBar() {
    let { userData, otherUsers, selectedUser, onlineUsers, searchData } = useSelector(state => state.user)
    let [search, setSearch] = useState(false)
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let [input, setInput] = useState("")

    const handleLogOut = async () => {
        try {
            let result = await axios.get(`${SERVERURL}/api/auth/logout`, { withCredentials: true })
            dispatch(setUserData(null))
            let userRes = await axios.get(`${SERVERURL}/api/user/others`, { withCredentials: true })
            dispatch(setOtherUsers(userRes.data))
            navigate("/login")

        } catch (error) {
            console.log("Error at handlelogout", error)

        }
    }

    const handleSearch = async () => {
        try {
            let result = await axios.get(`${SERVERURL}/api/user/search?query=${input}`, { withCredentials: true })
            dispatch(setSearchData(result.data))
            console.log(result)

        } catch (error) {
            console.log("Error at handleSearch frontend", error)

        }
    }

    useEffect(() => {
        if (input) {
            handleSearch()

        }

    }, [input])

    return (
        <div className={`${selectedUser ? 'hidden' : 'block'} lg:block lg:w-[30%] w-full h-screen bg-[#d5f4ec] shadow-gray-700 shadow-2xl overflow-hidden `}>
            <div onClick={handleLogOut} className=' w-12 h-12 rounded-full overflow-hidden flex justify-center items-center shadow-gray-700 shadow-lg bg-[#77c8b4] text-gray-700 my-5 fixed bottom-2.5 left-5 '>
                <RiLogoutCircleLine className='w-8 h-8 cursor-pointer' />
            </div>
            {input.length>0 && <div className='flex absolute top-62.5 bg-[#e6f6f2] w-full lg:w-[30%] h-auto overflow-y-auto items-center py-2.5 flex-col gap-1 z-150 shadow-lg rounded-2xl'>
{searchData?.map((user)=>(
     <div key={user._id} className='w-[95%] h-17.5 flex items-center gap-5  px-2.5 hover:bg-[#b6e3d8] cursor-pointer rounded-2xl outline-none ' onClick={()=>{
        dispatch(setSelectedUser(user))
        setInput("")
        setSearch(false)
     }
        }>
     <div className='relative rounded-full bg-white  flex justify-center items-center '>
     <div className='w-15 h-15   rounded-full overflow-hidden flex justify-center items-center '>
     <img src={user.image || dp} alt="" className='w-full h-full object-cover'/>
     </div>
     {onlineUsers?.includes(user._id) &&
     <span className='w-3 h-3 rounded-full absolute bottom-1.5 -right-px bg-[#3aff20] shadow-gray-500 shadow-md'></span>}
     </div>
     <h1 className='text-gray-800 font-semibold text-[20px]'>{user.name || user.userName}</h1>
     </div>
))}
        </div> }
            <div className='w-full h-75 bg-[#77c8b4] rounded-b-[30%] shadow-gray-400 shadow-2xl flex flex-col justify-center px-5'>

                <h1 className='text-white font-bold text-[25px] '>Lita</h1>
                <div className='w-full flex justify-between items-center'>
                    <h1 className='text-gray-700 font-bold text-[25px] '>
                        Hii, {userData.name || userData.userName}
                    </h1>
                    <div onClick={() => navigate("/profile")} className=' bg-[#d5f4ec] cursor-pointer w-15 h-15 rounded-full overflow-hidden flex justify-center items-center shadow-gray-700 shadow-lg'>
                        <img src={userData.image || dp} className='w-full h-full object-cover' />
                    </div>
                </div>
                <div className='w-full flex items-center gap-5 overflow-y-auto py-3.75'>
                    {!search && <div onClick={() => setSearch(true)} className=' w-12 h-12 rounded-full overflow-hidden flex justify-center items-center shadow-gray-700 shadow-lg bg-[#d5f4ec] my-5'>
                        <IoMdSearch className='w-8 h-8 cursor-pointer' />
                    </div>}
                    {search && <form className='w-full h-12 bg-[#d5f4ec] shadow-gray-500 shadow-lg flex items-center gap-2.5 my-5 px-4 outline-0 rounded-4xl overflow-hidden'>
                        <IoMdSearch className='w-8 h-8 ' />
                        <input type='text' placeholder='Search Users...' value={input} onChange={(e) => setInput(e.target.value)} className='w-full h-full border-0 outline-0' />
                        <IoCloseSharp className='w-8 h-8 cursor-pointer' onClick={() => { setSearch(false); setInput(""); dispatch(setSearchData([])); }} />

                    </form>}

                    {!search && otherUsers?.map((user) => (
                        onlineUsers?.includes(user._id) &&
                        <div key={user._id} onClick={() => dispatch(setSelectedUser(user))} className='relative rounded-full shadow-gray-500 bg-white shadow-lg flex justify-center items-center mt-2.5 cursor-pointer'>
                            <div  className=' w-15 h-15   rounded-full overflow-hidden flex justify-center items-center '>
                                <img src={user.image || dp} className='w-full h-full object-cover' />
                            </div>
                            <span className='w-3 h-3 rounded-full absolute bottom-1.5 -right-px bg-green-400 shadow-gray-500 shadow-md'></span>
                        </div>
                    ))}

                </div>
            </div>



            <div className='w-full h-[50%] overflow-auto flex flex-col gap-5 mt-5 items-center'>
                {otherUsers?.map((user) => (
                    <div key={user._id} onClick={() => dispatch(setSelectedUser(user))} className='w-[95%] h-15 flex justify-start items-center gap-5 bg-white shadow-gray-700 shadow-2xl rounded-4xl mx-2 hover:bg-[#c8f2e7] cursor-pointer  '>

                        <div className='relative rounded-full shadow-gray-500 bg-white shadow-lg flex justify-center items-center cursor-pointer'>
                            <div key={user._id} className=' w-15 h-15   rounded-full overflow-hidden flex justify-center items-center '>
                                <img src={user.image || dp} className='w-full h-full object-cover' />
                            </div>
                            {onlineUsers?.includes(user._id) &&
                                <span className='w-3 h-3 rounded-full absolute bottom-1.5 -right-px bg-green-400 shadow-gray-500 shadow-md'></span>}
                        </div>


                        <h1 className='text-gray-800 font-semibold text-[20px]'>{user.name || user.userName || 'user'}</h1>

                    </div>
                ))}
            </div>

        </div>
    )
}

export default SideBar