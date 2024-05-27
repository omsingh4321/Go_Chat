import React from 'react'
import { Box, Drawer, Typography,styled } from '@mui/material'
import {ArrowBack} from '@mui/icons-material';
import Profile from './Profile';
const drawerStyle={
    left:20,
    top:17,
    height:'95%',
    width: '30%',
    boxShadow: 'none'
}

const Header=styled(Box)`
background: #6AA5F2;
height: 107px;
color: #ffffff;
display: flex;
& > svg, & >p{
    margin-top: auto;
    padding : 15px;
    font-weight: 600;
}
`;
const Component=styled(Box)`
background: #ededed;
height: 85%;

`


const InfoDrawer = ({open,setOpen}) => {
  return (
    <Drawer
    open={open}
      onClose={()=>setOpen(false)}
      PaperProps={{sx:drawerStyle}}
      style={{zIndex:1500}}
    >
      <Header>
   <ArrowBack onClick={()=>setOpen(false)}/>
   <Typography>Profile</Typography>
      </Header>
      
      <Component>
       <Profile/>
      </Component>
    </Drawer>
  )
}

export default InfoDrawer
