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
            return res.status(HTTP_STATUS.BAD_REQUEST).json({message:"user not found"})
        }

        return res.status(HTTP_STATUS.OK).json(user)
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message:`editProfile error ${error}`})
    }
}

export const getOtherUsers = async (req,res) => {
    try {
        let users=await User.find({
            _id:{$ne:req.userId}
        }).select("-password")
        return res.status(HTTP_STATUS.OK).json(users)
        
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message:`getOtherUsers error ${error}`})
    }
}

export const search = aasync(req,res) => {
    try {

        let {query} = req.query
        if(!query){
            return res.status(HTTP_STATUS.NOT_FOUND).json({message:`query is required`})
        }
        let users=await User.find({
            $or:[
                {name:{$regex:}}
            ]
        })

        
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message:`search backend error ${error}`})
    }
}