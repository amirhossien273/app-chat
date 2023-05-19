import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import InputEmoji from "react-input-emoji";
import { Stack } from "react-bootstrap";

const MessageComponent = () => {

    const {user} = useContext(AuthContext);
    const {CurrentChat, messages, isMessagesLoding, isMessagesError, sendTextMessage} = useContext(ChatContext);
    const {recipientUser} = useFetchRecipientUser(CurrentChat, user);
    const [textMessage, setTextMessage] = useState("");

    console.log("text", textMessage);

    if(!recipientUser) return(<>
       <p style={{textAlign: "center", width: "100%"}}> no conversation selected yet... </p>
    </>)

    return (<>
    	<main>
            {/* <header> */}
                {/* <div>
                    <p>{recipientUser?.name}</p>
                </div> */}
            {/* </header> */}
            <ul id="chat">
                {messages.map((message, index) =>{
                    return (<>
                     <li className={`${message.senderId === user?._id ?  "me" : "you"}`}  key={index}>
                        <div className="entete">
                            {/* <span className="status green"></span> */}
                            <h2>{message.senderId === user?._id ?  user?.name : recipientUser?.name}</h2>
                            <h3>{message.createdAt}</h3>
                        </div>
                        <div className="triangle"></div>
                        <div className="message">{message.text}</div>
                     </li>
                    </>);
                })} 
            </ul>
            <footer>
                <Stack gap={3} className="chat-input flex-grow-0">
                    <InputEmoji
                     value={textMessage} 
                     onChange={setTextMessage} 
                     fontFamily="nunito" 
                     borderColor="rgba(72, 112, 223, 0.2)"
                      />
                      <button className="send-btn" onClick={() => sendTextMessage(textMessage, user, CurrentChat._id, setTextMessage)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send-fill" viewBox="0 0 16 16">
                               <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                          </svg>
                      </button>
                </Stack>
            </footer>
	</main>
    </>);
}

export default MessageComponent;