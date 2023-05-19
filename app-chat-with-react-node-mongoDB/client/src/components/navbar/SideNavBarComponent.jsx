import React, { useContext } from "react";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

import SideNav, {
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import ChatList from "../chat/ChatListComponent";

export default function SideNavBar() {
 
  const {userChat, isUserChatsLoading, updateCurrentChat} = useContext(ChatContext);
  const {user} = useContext(AuthContext);


    return ( <>
      <SideNav style={{backgroundColor: "#cec3c342", minWidth: "240px", boxShadow: "4px 8px 4px 1px rgba(0,0,0,.07),0 2px 4px rgba(0,0,0,.05)"}} >
         <SideNav.Toggle /> 
        <SideNav.Nav  defaultSelected="home">
          {userChat?.lenght < 1 ? null : 
            userChat?.map((chat, index) => {
              return(
                <NavItem style={{height: "70px"}} key={index}  eventKey={index} >
                  <div onClick={() => updateCurrentChat(chat)}>
                    <ChatList chat={chat} user={user}></ChatList>
                  </div>
               </NavItem>
              );
            })
          }
        </SideNav.Nav>
      </SideNav>
      </>);
}