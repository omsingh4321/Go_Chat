import LoginDialog from "./account/loginDialog";
import {AppBar,Toolbar,styled,Box} from "@mui/material";
import ChatsDialog from "./chat/chatsDialog";
import { useContext } from "react";
import { AccountContext } from "./context/AccountProvider";
const LoginHeader=styled(AppBar)`
height: 229px;
background-color: #6AA5F2 ;
box-shadow: none;
`
const Component=styled(Box)`
height:100vh;
background-color: #D9F1ED ;
`
const Header=styled(AppBar)`
height: 125px;
background-color: #6AA5F2;
box-shadow: none;
`
const Messenger=()=>{
    const {account}=useContext(AccountContext);
return (<Component>
{account? <>
    <Header>
    <Toolbar>
    </Toolbar>
</Header>
    <ChatsDialog/>
</>
: <>
<LoginHeader>
    <Toolbar>
    </Toolbar>
</LoginHeader>
    <LoginDialog/>
</>

}
</Component>
)
}

export default Messenger;