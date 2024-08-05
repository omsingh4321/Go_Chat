import {  createContext, useState,useRef ,useEffect} from "react";


export const AccountContext=createContext(null);
const AccountProvider=({children})=>{
    const [account,setAccount]= useState();
    const [person,setPerson]= useState({});
    const [activeUsers,setActiveUser]=useState([]);
    const [newMessageFlag,setNewMessageFlag]=useState(false);
    
   return (
    <AccountContext.Provider value={{
        account,
       setAccount,
       person,
       setPerson,
       activeUsers,
       setActiveUser,
       newMessageFlag,
       setNewMessageFlag
    }}
    >
    {children}
    </AccountContext.Provider>
   )

}

export default AccountProvider;