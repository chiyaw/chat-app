import User from "../models/user.model.js";
import { HTTP_STATUS, ERROR_MESSAGES } from "../constants.js";
import uploadOnCloudinary from "../config/cloudinary.js";

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

export const editProfile=async (req,res)=>{
    try {
        let {name}=req.body
        let image;
        if(req.file){
            image=await uploadOnCloudinary(req.file.path)
        }
        let user=await User.findByIdAndUpdate(req.userId,{
           name,
           image 
        },{ returnDocument: 'after' })

        if(!user){
            return res.status(400).json({message:"user not found"})
        }

        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({message:`profile error ${error}`})
    }
}

