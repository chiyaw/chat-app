import React, { useEffect, useRef } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import getCurrentUser from './customHooks/getCurrentUser'
import { useDispatch, useSelector } from 'react-redux'
import Home from './pages/Home'
import Profile from './pages/Profile'
import getOtherUsers from './customHooks/getOtherUsers'
import { io } from 'socket.io-client'
import { SERVERURL } from '../constant'
import { setOnlineUsers } from './redux/userSlice'
import { useSocket } from './context/SocketContext'

function App() {
  getCurrentUser()
  getOtherUsers()
  let {userData} = useSelector(state=>state.user)
  let dispatch = useDispatch()
  const { setSocket } = useSocket()
  const socketRef = useRef(null)

  useEffect(() => {
    if (!userData?._id) {
      if (socketRef.current) {
        socketRef.current.close()
        socketRef.current = null
      }
      setSocket(null)
      dispatch(setOnlineUsers([]))
      return
    }

    const socketio = io(SERVERURL, {
      query: {
        userId: userData._id,
      },
    })

    socketRef.current = socketio
    setSocket(socketio)
    socketio.on("getOnlineUsers", (users) => {
      dispatch(setOnlineUsers(users))
    })

    return () => {
      socketio.off("getOnlineUsers")
      socketio.close()
      socketRef.current = null
      setSocket(null)
    }
  }, [userData?._id, dispatch, setSocket])
  return (
    <Routes>
      <Route path='/login' element={!userData?<Login/>:<Navigate to = '/'/>}/>
      <Route path='/signup' element={!userData?<SignUp/>:<Navigate to = '/profile'/>}/>
      <Route path='/' element={userData?<Home/>:<Navigate to = '/login'/>}/>
      <Route path='/profile' element={userData?<Profile/>:<Navigate to = '/signup'/>}/>
    </Routes>
  )
}

export default App
