import mongoose from "mongoose";

const MessageSchema= new mongoose.Schema({
    conversationId:{
        type: String
    },
    senderId:{
        type: String
    },
    reciverId:{
        type: String
    },
    encodedText: { type: String, required: true },
    huffmanTree: { type: Object, required: true },
    type:{
        type: String
    },
},
{
    timestamps: true
}
);

const message=mongoose.model('Message',MessageSchema);
export default message;