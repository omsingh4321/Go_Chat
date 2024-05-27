import React from 'react'
import { useEffect,useState,useContext } from 'react'
import { getUsers } from '../../services/api'
import { Box,styled,Divider } from '@mui/material'
import Conversations from './Conversations'
import { AccountContext } from '../../context/AccountProvider'
const Conversation = ({text}) => {
const [users,setUsers]= useState([]);

const {account,socket,setActiveUser}= useContext(AccountContext);
const Component=styled(Box)`
height: 81vh;
overflow: overlay;
`;

const StyleDivider=styled(Divider)`
margin: 0 0 0 70px;
background: #e9edef;
opacity: 0.6;
`

    useEffect(()=>{
        const fetchdata=async()=>{
            let response=await getUsers();
            const filterData= response.filter(user=> user?.name?.toLowerCase()?.includes(text.toLowerCase()));
            setUsers(filterData);
        }
        fetchdata();
          
    },[text]);

    useEffect(()=>{
     socket.current.emit("addUsers",account);
      socket.current.on("getUsers", users=>{
       setActiveUser(users);
      });

    },[account])


  return (
    <Component>
      {
        users.map(user=>(
            user.sub!==account.sub &&
            <>
          <Conversations user={user} />
            <StyleDivider/>
          </>
        ))
      }
    </Component>
  )
}

export default Conversation
