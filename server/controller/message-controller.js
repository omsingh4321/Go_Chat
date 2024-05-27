import Message from '../model/Message.js';
import Conversation from '../model/Conversation.js';
import { MakeEncode, decode, Hufftree } from '../utils/huffman.js';

export const newMessage = async (request, response) => {
    try {
        

        const { tree, encoded } = MakeEncode(request.body.text);
       const Obj={
        conversationId: request.body.conversationId,
        senderId: request.body.senderId,
        reciverId:  request.body. reciverId,
         type: request.body.type,
         encodedText: encoded,
         huffmanTree: tree,
       }
    
        const newMessage = new Message(Obj);
        await newMessage.save();
          
        await Conversation.findByIdAndUpdate(request.body.conversationId, { message: request.body.text });

        return response.status(200).json("Message Sent");
    } catch (error) {
        return response.status(500).json(error.message);
    }
};

export const getMessage = async (request, response) => {
    try {
        const messages = await Message.find({ conversationId: request.params.id });
        const decodedMessages = messages.map(message => {
            const tree = Hufftree.deserialize(message.huffmanTree);
            return {
                decodedText: decode(tree, message.encodedText),
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
