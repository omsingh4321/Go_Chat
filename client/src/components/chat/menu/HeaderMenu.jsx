import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {Menu,MenuItem,styled} from "@mui/material";
import { useState } from "react";

const HeaderMenu = ({setOpenDrawer}) => {
const [open,setOpen]= useState(false);
const handleClose=()=>{
    setOpen(null);
}

const MenuOption = styled(MenuItem)`
font-size: 14px;
padding: 15px 60px 5px 24px;
color: #4a4a4a;
`


const handleClick=(e)=>{
 setOpen(e.currentTarget);
}

  return (
    <>
      <MoreVertIcon onClick={handleClick}/>
      <Menu
        anchorEl={open}
        open={open}
        keepMounted
        onClose={handleClose}
        getContentAnchorE1={null}
       anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',

       }}
       transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
       }}
      >
        <MenuOption onClick={()=>{handleClose();setOpenDrawer(true)}}>Profile</MenuOption>
       
      </Menu>
    </>
  );
};

export default HeaderMenu;
