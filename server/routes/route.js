import express from 'express';
const route= express.Router();

import { addUser, getUsers} from '../controller/user-controller.js'; //.js extension is necessay to apply in backend
import { newConversation,getConversation} from '../controller/conversation-controller.js';
import { getMessage, newMessage } from '../controller/message-controller.js';
import { uploadFile,getImage } from '../controller/image-controller.js';

import upload from '../utils/upload.js';
route.post('/add',addUser);
route.get('/users',getUsers);
route.post('/conversation/add',newConversation);
route.post('/conversation/get',getConversation);
route.post('/message/add',newMessage);
route.get('/message/get/:id',getMessage);
route.post('/file/upload',upload.single("file"),uploadFile); //Middlewares is being used
route.get('/file/:filename',getImage);
export default route;