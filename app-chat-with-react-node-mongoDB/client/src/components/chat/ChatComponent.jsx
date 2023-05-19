import React, { useContext,useState } from 'react';
import {
    MDBCard,
    MDBCardBody
  } from 'mdb-react-ui-kit';
import { ChatContext } from '../../context/ChatContext';
import PotentiaChats from './PotentiaChatsComponent';
import Message from './MessageComponent';

function ChatComponent() {

    const{createChat} = useContext(ChatContext);

    return (
        <> 
        <MDBCard style={{margin: "auto", backgroundColor: "#cec3c342"}}>
          <MDBCardBody>
              <PotentiaChats></PotentiaChats>
              <Message></Message>
          </MDBCardBody>
        </MDBCard>           
       </>
  );
}

export default ChatComponent