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
    text: { type: String },
    huffmanTree: { type: Object},
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