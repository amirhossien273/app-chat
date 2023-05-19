import Navbar from "../components/navbar/NavbarComponent"
import { ChatContextPorovider } from "../context/ChatContext";
import ChatComponent from "../components/chat/ChatComponent";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


function Chat() {

  const {user} = useContext(AuthContext);

    return (
      <ChatContextPorovider user={user}>
       <Navbar/>
       <div style={{marginTop: "73px", marginLeft: "145px"}}>
        <ChatComponent></ChatComponent>
       </div>
      </ChatContextPorovider>
    )
  }
  
  export default Chat 
  