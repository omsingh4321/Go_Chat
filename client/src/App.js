import Messenger from "./components/Messenger";
import { GoogleOAuthProvider } from '@react-oauth/google';
import AccountProvider from "./components/context/AccountProvider";

function App() {
  const clientId="869408789376-n00bga9sud1dlhvssgf209njdb5o5juf.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={clientId}>
    <AccountProvider>
    <Messenger/>
    
    </AccountProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
