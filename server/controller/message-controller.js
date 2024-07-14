import Message from '../model/Message.js';
import Conversation from '../model/Conversation.js';
import { MakeEncode, decode, Hufftree } from '../utils/huffman.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const newMessage = async (request, response) => {

    try {
        const {conversationId,senderId,reciverId,type,text}=request.body;
        if(!conversationId || !senderId || !reciverId || !type || !text)
            return response.json(500).message("Some Field is missing");
       if(reciverId==='1234567890')
       {
        const genAI = new GoogleGenerativeAI('AIzaSyCT-mlCjWipFDYoj88Bp__eGkFNObjddGI');

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
        async function run() {
            const prompt = `${text} answer in less than 50 words`;
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const responseByAi = response.text();
                const { tree, encoded } = MakeEncode(responseByAi);
               const Obj={
                conversationId: request.body.conversationId,
                senderId:  request.body.reciverId,
                reciverId: request.body.senderId,
                 type: request.body.type,
                 text: encoded,
                 huffmanTree: tree,
               }
                const newMessage = new Message(Obj);
                await newMessage.save();
                  
                await Conversation.findByIdAndUpdate(request.body.conversationId, { message: request.body.text });
            
          }
          if(type==='text') run();
          else return response.status(500).message("Not Correct Format");

       }
        if(request.body.type==='text'){ 
        const { tree, encoded } = MakeEncode(request.body.text);
       const Obj={
        conversationId: request.body.conversationId,
        senderId: request.body.senderId,
        reciverId:  request.body.reciverId,
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
        const messages = await Message.find({ conversationId: request.params.id });
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
