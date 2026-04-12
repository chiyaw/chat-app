import User from "../models/user.model.js";
import { HTTP_STATUS, ERROR_MESSAGES } from "../constants.js";

export const getCurrentUser=async (req,res) => {
    try{
        let userId=req.userId
        let user=await User.findById(userId).select("-password")
        if(!user) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({message: `${ERROR_MESSAGES.USER_NOT_FOUND}`})
        }
        return res.status(HTTP_STATUS.OK).json(user)

    } catch (error) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({message:`${ERROR_MESSAGES.CURRENT_USER_ERROR} , ${error}`})
    }
}

