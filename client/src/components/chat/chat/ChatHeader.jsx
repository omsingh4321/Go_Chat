import React from 'react'
import { Box,Typography,styled } from '@mui/material'
import { Search,MoreVert } from '@mui/icons-material'
import { useContext } from 'react';
import Go_Ai from '../../Images/Go_Ai.jpg';
import { AccountContext } from '../../context/AccountProvider';

const Header=styled(Box)`
 height: 44px;
 background: #ededed;
 padding: 8px 16px;
 display: flex;
 align-items: center;
`;
const Image=styled('img')({
    height: 40,
    width: 40,
    objectFit: 'cover',
    borderRadius: '50%'
})
const Name=styled(Typography)`
margin-left: 12px !important;

`;

const Status=styled(Typography)`
margin-left: 12px !important;
font-size: 12px;
color: rgb(0,0,0,0.6);

`;

const RightContainer=styled(Box)`
margin-left: auto;
& > svg {
    padding: 8px;
    font-size: 24px;
    color: #000;

}

`

const ChatHeader = ({person}) => {
  const {activeUsers}=useContext(AccountContext);
  return (
    <Header>
      <Image src={ person.sub ==='1234567890'? Go_Ai : person.picture} alt="Dp"/>
      <Box>
        <Name>{person.name}</Name>
        {person.sub!=='1234567890' &&
        <Status>{activeUsers?.find(user=>user.sub=== person.sub)? 'Online':'Offline'}</Status>
        }
      </Box>
      <RightContainer>
        <Search/>
        <MoreVert/>
      </RightContainer>
    </Header>
  )
}

export default ChatHeader
