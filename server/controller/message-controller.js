import Message from '../model/Message.js';
import Conversation from '../model/Conversation.js';
import { MakeEncode, decode, Hufftree } from '../utils/huffman.js';

export const newMessage = async (request, response) => {
    try {
        
        const {conversationId,senderId,reciverId,type}=request.body;
        if(!conversationId || !senderId || !reciverId || !type)
            return response.json(500).message("Some Field is missing");
        if(request.body.type==='text'){ 
        const { tree, encoded } = MakeEncode(request.body.text);
       const Obj={
        conversationId: request.body.conversationId,
        senderId: request.body.senderId,
        reciverId:  request.body. reciverId,
         type: request.body.type,
         text: encoded,
         huffmanTree: tree,
       }
    
        const newMessage = new Message(Obj);
        await newMessage.save();
          
        await Conversation.findByIdAndUpdate(request.body.conversationId, { message: request.body.text });

        return response.status(200).json("Message Sent");
    }
    else{
        const newMessage=new Message(request.body);
        await newMessage.save();
        await Conversation.findByIdAndUpdate(request.body.conversationId,{ message: request.body.text});
        return response.status(200).json("Message Sent");
    }
    } catch (error) {
        return response.status(500).json(error.message);
    }
};

export const getMessage = async (request, response) => {
    try {
        console.log(request.params.id);
        const messages = await Message.find({ conversationId: request.params.id });
        console.log(messages);
        const decodedMessages = messages.map(message => {
            if(message.type!='file'){
            const tree = Hufftree.deserialize(message.huffmanTree);
            return {
                text: decode(tree, message.text),
                type: message.type,
                senderId: message.senderId,
                createdAt: message.createdAt
            };
        }
        else return {
            text: message.text,
            type: message.type,
            senderId: message.senderId,
            createdAt: message.createdAt
        };
        });
        return response.status(200).json(decodedMessages);
    } catch (error) {
        return response.status(500).json(error.message);
    }
};
