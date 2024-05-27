import { Box, Dialog ,Typography,List,ListItem,styled} from "@mui/material";
import { qrCodeImage } from "../../constants/data";
import {GoogleLogin} from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { AccountContext } from "../context/AccountProvider";
import { addUser } from "../services/api";

const dialogStyle={
    height: '95%',
    merginTop: '12%',
    width: '60%',
    maxWidth: '100%',
    maxheight: '100%',
    boxShadow: 'none',
    overflow: 'hidden'

}
const Component=styled(Box)`
display: flex;
`
const Container=styled(Box)`
padding: 56px 0 56px 56px;
`
const QrCode=styled('img')({
    height: 264,
   width: 264 ,
   margin: '50px 0 0 50px'
})

const Title=styled(Typography)`
font-size: 26px;
color: #525252;
font-weight: 300;
font-family: inherit;
margin-bottom: 25px;
`
const StyledList= styled(List)`
 & > li{
    padding: 0;
    margin-top: 15px; 
    font-size: 18px;
    line-height: 28px;
    color: #4a4a4a;
 }
`

const LoginDialog=()=>{

    const {setAccount}= useContext(AccountContext);
const onLoginSuccess= async (res)=>{

    const decoded=jwtDecode(res.credential);
    console.log(decoded);
    setAccount(decoded);
    await addUser(decoded);

}

const onLoginError=(res)=>{
    // console.log("Errorr is comming");
    // console.log(res);

}


    return(
    <Dialog open={true} PaperProps={{
        sx:dialogStyle
    }}
    hideBackdrop={true}
    >
    <Component>
        <Container>
         <Title>To use Go_Chat on your Computer</Title> 
            <StyledList>
                <ListItem>1. Open Go_Chat on your Phone</ListItem>
                <ListItem>2. Tap Menu Setting and selects Go_Chat web</ListItem>
                <ListItem>3. Point your Phone to this screen to capture the code</ListItem>
                <ListItem>4. You can also Use Google Authentications</ListItem>
            </StyledList>
        </Container>
        <Box style={{position: 'relative'}}>
          <QrCode src={qrCodeImage} alt="Qr Code " />
          <Box  style={{position: 'absolute',top: '45%',transform: 'translateX(50%)'}}>
            <GoogleLogin
               onSuccess={onLoginSuccess}
               onError={onLoginError}
            />
          </Box>
        </Box>
    </Component>
    </Dialog>
    
    );
}

export default LoginDialog;