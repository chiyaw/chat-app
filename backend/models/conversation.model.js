import mongoose from "mongoose";


const conversationSchema=new mongoose.Schema({
    partcipants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"            
        }
    ],
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message"
        }
    ]
},{Timestamp:true})

const Conversation = mongoose.model("Conversation", conversationSchema)

export default Conversation