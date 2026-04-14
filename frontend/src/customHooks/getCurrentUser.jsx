import axios from "axios"
import { useEffect } from "react"
import { SERVERURL } from "../../constant"
import { useDispatch, useSelector } from "react-redux"
import { setUserData } from "../redux/userSlice"

const getCurrentUser = () => {

    let dispatch = useDispatch()
    let {userData} = useSelector(state=>state.user)


    useEffect(()=>{
    if (userData) return;

    const fetchUser = async () => {
        try {
            let result = await axios.get(`${SERVERURL}/api/user/current`, {withCredentials:true})
            dispatch(setUserData(result.data))
        } catch (error) {
            console.log(error)
        }
    }
    fetchUser()
}, [userData])
}

export default getCurrentUser