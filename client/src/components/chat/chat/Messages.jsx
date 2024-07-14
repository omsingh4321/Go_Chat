import React, { useEffect, useState,useRef } from 'react'
import { Box,styled } from '@mui/material'
import Footer from './Footer'
import { useContext } from 'react'
import {newMessage,getMessage} from '../../services/api'
import {AccountContext} from '../../context/AccountProvider'
import Message from './Message'

const Wrapper=styled(Box)`
background-image: url(${'https://images.unsplash.com/photo-1533628635777-112b2239b1c7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hhdCUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D'});
background-size: 100%;
`
const Component = styled(Box)`
  height: 76vh;
  overflow-y: auto;
`;

const Messages = ({person,conversation}) => {
  const [text,setText]=useState('');
  const {account,socket,newMessageFlag,setNewMessageFlag} =useContext(AccountContext);
  const [messages,setMessages]= useState([]);
  const [file,setFile]=useState();
  const [image,setImage]=useState('');
  const messagesEndRef = useRef(null);
  
  const [inCommingMsg,setIncommingMsgs]=useState(null);

  useEffect(()=>{
     const getMessageDetails=async()=>{
       let data=await getMessage(conversation?._id);
       setMessages(data);
     }
    conversation?._id && getMessageDetails();
    if(person.sub==='1234567890'){
      let counter=10;
      const interval = setInterval( async () => {
        if (counter === 0 ||!conversation._id) {
          clearInterval(interval);
          return;
        }
        await getMessageDetails();
        counter--;
      }, 1000); 
   }

  },[conversation?._id,newMessageFlag]);

  useEffect(()=>{
    socket.current.on('getMessage',data=>{
      setIncommingMsgs({
        ...data,
        createdAt: Date.now()
      })
    })
    
      console.log(messagesEndRef.current);
      if(messagesEndRef.current){
       messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
     
  },[messages]);

  
  useEffect(()=>{
    inCommingMsg && conversation?.members?.includes(inCommingMsg.senderId) && 
    setMessages(prev=>[...prev,inCommingMsg])
   
  },[inCommingMsg,conversation])

  

const sendText= async(e)=>{
   
   const code = e.keyCode || e.which;
if(code===13){
  let message;
  if(!file){
message={
  senderId: account.sub,
  reciverId: person.sub,
  conversationId: conversation?._id,
  type: 'text',
  text: text
}
  }
  else{
    message={
      senderId: account.sub,
      reciverId: person.sub,
      conversationId: conversation?._id,
      type: 'file',
      text: image
    }
  }
 socket.current.emit('sendMessage',message);
 await newMessage(message);
  setText('');
  setFile('');
  setImage('');
  setNewMessageFlag(prev=>!prev);
}
  }
const Container=styled(Box)`
 padding: 1px 80px;
 padding-bottom: 15px;
 
`

  return (
    <Wrapper>
      <Component>
      {
        messages && messages.map(message=>(
          <Container>
          <Message message={message}/>
          </Container>
        ))
      }
      {/* <div ref={messagesEndRef}/> */}
      </Component>
      <Footer sendText={sendText}
        setText={setText}
        text={text}
        file={file}
        setFile={setFile}
        setImage={setImage}
        image={image}
      />
    </Wrapper>
  )
}

export default Messages
