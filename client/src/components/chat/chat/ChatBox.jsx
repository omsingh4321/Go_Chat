import React, { useEffect,useState } from 'react'
import { Box } from '@mui/material'
import ChatHeader from './ChatHeader'
import Messages from './Messages'
import { useContext } from 'react'
import { AccountContext } from '../../context/AccountProvider'
import {getConversation} from '../../services/api'
const ChatBox = () => {
  const { person ,account}=useContext(AccountContext);
const [conversation,setConversation]=useState({});
  useEffect(()=>{
    const getConversationDetail= async()=>{
      let data= await getConversation({
        senderId: account.sub,
        reciverId:person.sub
       });
       setConversation(data);
    }
    getConversationDetail();
  },[person.sub])
  return (
    <Box>
      <ChatHeader person={person}/>
      <Messages person={person} conversation={conversation}/>
      
    </Box>
  )
}

export default ChatBox
