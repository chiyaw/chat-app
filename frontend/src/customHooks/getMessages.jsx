import axios from "axios"
import { useEffect } from "react"
import { SERVERURL } from "../../constant"
import { useDispatch, useSelector } from "react-redux"
import { setMessages } from "../redux/messageSlice"

const getMessage = () => {

    let dispatch = useDispatch()
    let {userData, selectedUser } = useSelector(state=>state.user)


    useEffect(()=>{
    if (!userData || !selectedUser?._id) return;

    const fetchMessages = async () => {
        try {
            let result = await axios.get(`${SERVERURL}/api/message/get/${selectedUser._id}`, {withCredentials:true})
            dispatch(setMessages(result.data || []))
        } catch (error) {
            console.log(error)
            dispatch(setMessages([]))
        }
    }
    fetchMessages()
}, [selectedUser, userData, dispatch])
}


export default getMessage