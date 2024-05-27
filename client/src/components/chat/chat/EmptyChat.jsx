import React from 'react'
import { Box, Typography,styled } from '@mui/material'
import { emptyChatImage } from '../../../constants/data'

const Component=styled(Box)`
background: #f8f9f8;
padding: 30px 0;
text-align: center;
height: 100vh;

`;
const Container=styled(Box)`
 padding: 0 200px;

`;
const Image=styled('img')({
  width: 400,
  marginTop: 100,

});
const Title=styled(Typography)`
font-size: 32px;
margin: 25px 0 10px 0;
font-family: inherit;
font-weight: 300;
color: #41525d;
`
const SubTitle= styled(Typography)`
font-size: 14px;
color: #667781;
font-weight: 400;
font-family: inherit;
`



const EmptyChat = () => {
  return (
    <>
     <Component>
      <Container>
       <Image src={emptyChatImage} alt="Image"/>
       <Title>Go_Chat Web</Title>
       <SubTitle>Now Send and receive messages without keeping your phone online<br></br>Use Go_Chat upto four linked device</SubTitle>
      </Container>
     </Component> 
    </>
  )
}

export default EmptyChat
