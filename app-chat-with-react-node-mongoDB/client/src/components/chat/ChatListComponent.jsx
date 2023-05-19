import React, { useContext,useState } from 'react';
import { ChatContext } from '../../context/ChatContext';
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";


function ChatListComponent({chat, user}) {

    const {recipientUser} = useFetchRecipientUser(chat, user);

    return (
        <> 
        <div style={{color: "#373737",paddingLeft: "15px",marginTop: "10px", borderBottom: "2px solid #8c8c8c"}}>
            <div style={{lineHeight: 0}} className='name'>{recipientUser?.name}</div>
            <div style={{fontSize: "10px",color: "#919191"}} className='text'>Text message...</div>
            <div className='d-flex flex-column align items-end'>
                <div style={{fontSize: "10px", position: "absolute",top: "-24px",right: "21px",color: "#919191"}} className="data">12/12/2022</div>
                <div style={{fontSize: "13px",position: "absolute",top: "20px",lineHeight: 1,right: "21px",color: "rgb(145, 145, 145)",height: "15px",width: "15px",borderRadius: "50%",background: "red",}}className="this-user-notification">
                    <span style={{justifyContent: "center", display: "flex"}}>2</span>
                </div>
                <span className='user-online'></span>
            </div>
        </div>       
       </>
  );
}

export default ChatListComponent