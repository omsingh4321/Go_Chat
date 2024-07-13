import React, { useEffect } from 'react'
import { Box, InputBase,styled } from '@mui/material'
import {EmojiEmotionsOutlined,AttachFile,Mic} from '@mui/icons-material';
import { useState } from 'react';
import { uploadFile } from '../../services/api';
const Container=styled(Box)`
height: 55px;
background: #ededed;
display: flex;
width: 100%;
align-items: center;
padding: 0 15px;
& > *{
 margin: 5px;
 color: #919191;

}
`;
const Search =styled(Box)`
background-color: #FFFFFF;
border-radius: 18px;
width: calc(94% - 100px);
`;
const InputField=styled(InputBase)`
width: 100%;
padding: 20px;
height: 20px;
padding-left: 25px;
font-size: 14px;
`;
const ClipIceon=styled(AttachFile)`
transform: rotate(40deg);
`



const Footer = ({sendText,setText,text,file,setFile,setImage,image}) => {
  const onFileChange=(e)=>{
   setFile(e.target.files[0]);
   setText(e.target.files[0].name);
  }
  
  useEffect(()=>{
      const getImage= async()=>{
          if(file)
          {
            const data= new FormData();
            data.append('primary',`${file.lastModified}${file.name}`)
            data.append('name',file.name);
            data.append('file',file);
            setImage(`http://localhost:5000/file/${file.lastModified}${file.name}`);
            console.log("Yes");
            await uploadFile(data);

          }
      }
      getImage();
  },[file])

  return (
    <Container>
      <EmojiEmotionsOutlined/>
      <label htmlFor='FileInput'>
      <ClipIceon/>
      </label>
      <input type='file'
        style={{display: 'none'}}
        id='FileInput'
        onChange={(e)=>onFileChange(e)}
      />
      <Search>
        <InputField
            placeholder='Type a message'
            onChange={(e)=>setText(e.target.value)}
            onKeyDown={(e)=>sendText(e)}
            value={text}
        />
      </Search>
      <Mic/>
    </Container>
  )
}

export default Footer
