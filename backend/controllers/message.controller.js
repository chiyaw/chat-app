import uploadOnCloudinary from "../config/cloudinary.js";
import { HTTP_STATUS } from "../constants.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req,res)=>{
    try {
        let sender = req.userId
        let {receiver} =req.params
        let {message}=req.body

        let image
        if(req.file){
            image = await uploadOnCloudinary(req.file.path)

        }

        let conversation = await Conversation.findOne({
            partcipants:{$all:[sender,receiver]}
        })

        let newMessage = await Message.create({
            sender,receiver,message,image
        })

        if(!conversation){
            conversation=await Conversation.create({
                    partcipants:[sender,receiver],
                    messages:[newMessage._id],
                })
        } else {
            conversation.messages.push(newMessage._id)
            await conversation.save()
        }

        return res.status(HTTP_STATUS.OK).json(newMessage)
    } catch (error) {

        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message:`sendMessage Constroller Error ${error}`})
        
    }
}

export const getMessages = async (req,res) => {
    try {
        let sender=req.userId
        let {receiver}=req.params
        let conversation = await Conversation.findOne({
            partcipants:{$all:[sender,receiver]}
        }).populate("messages")
        if(!conversation){
            return res.status(HTTP_STATUS.NOT_FOUND).json({message:"Conversation is not found"})
        }

        return res.status(HTTP_STATUS.OK).json(conversation?.messages)
        
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message:`getMessage Constroller Error ${error}`})
    }
}