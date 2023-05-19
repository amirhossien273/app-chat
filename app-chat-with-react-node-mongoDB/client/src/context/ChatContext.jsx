import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, getRequest, postRequest } from "../utils/servises";
import { useReducer } from "react";
import {io} from "socket.io-client";

export const ChatContext = createContext();

export const ChatContextPorovider = ({children, user}) => {

    const [userChat, setUserChat] = useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);
    const [potentiaChats, setPotentiaChats] = useState([]);
    const [CurrentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState(null);
    const [isMessagesLoding, setIsMessagesLoding] = useState(false);
    const [isMessagesError, setMessagesError] = useState(null);
    const [sendTextMesaageError, setSendTextMesaageError] = useState(null);
    const [newMessage, setNewMessage] = useState(null);
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    console.log(onlineUsers)

    useEffect(() => {  
        
        const newSocket = io("http://127.0.0.1:3000");
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        }
     },[user]);

     useEffect(() => {  

        if(socket === null) return
        socket.emit("addNewUser", user?._id);
        socket.on("getUserOnline", (res) => {
            setOnlineUsers(res);
        });
        
     },[socket]);

     useEffect(() => {  
        if(socket === null) return;

        const recipientId = CurrentChat?.members.find((id) => id !== user?._id);

        socket.emit("sendMessage", {...newMessage, recipientId});
        
     },[newMessage]);

     useEffect(() => {  
        if(socket === null) return;

        socket.on("getMessage", res => {

            if(CurrentChat?._id !== res.chatId) return
            
            setMessages((pev) => [...pev, res]);
        });

        return () => {
            socket.off("getMessage");
        }
        
     },[socket, CurrentChat]);

    useEffect(() => {

        const getUsers = async () => {
            
            const response = await getRequest(`${baseUrl}/user`);

            if(response.error) return console.log("Error Server");

            const pChats = response.filter((u) => {
                let isChatCreated = false;
                if(user._id === u._id ) return false;

                if(userChat){
                  isChatCreated = userChat?.some((chat) => {
                        return chat.members[0] === u._id || chat.members[1] === u._id
                    })
                }

                return !isChatCreated;
            });

            setPotentiaChats(pChats);
        };

        getUsers();
    },[userChat])

    useEffect(() => {

        const getUserChats = async () => {
            if(user?._id){

                setIsUserChatsLoading(true);
                setUserChatsError(null);

                const response = await getRequest(`${baseUrl}/chats/${user?._id}`);

                setIsUserChatsLoading(false);

                if(response.error) return setUserChatsError(response);

                setUserChat(response);
            }
        }
        getUserChats();
    },[user]);

    useEffect(() => {

        const getMessages = async () => {

            setIsMessagesLoding(true);
            setMessagesError(null);

            const response = await getRequest(`${baseUrl}/messages/${CurrentChat?._id}`);

            setIsMessagesLoding(false);

            if(response.error) return setIsMessagesLoding(response);

            setMessages(response);
        }
        getMessages();
    },[CurrentChat]);

    const sendTextMessage = useCallback(async (text, sender, currentChatId, setTextMessage) => {
       
        if(!text) return console.log();

        setSendTextMesaageError("")

       const response = await postRequest(`${baseUrl}/messages`,JSON.stringify({
            chatId: currentChatId,
            senderId: sender._id,
            text: text
        }));

        if(response.error) return setSendTextMesaageError(response);

        setNewMessage(response);
        setMessages((pev) => [...pev, response]);
        setTextMessage("");

    },[]);

    const updateCurrentChat =  useCallback(async (chat) => {
        console.log(chat);
        setCurrentChat(chat);

    },[]);

    const createChat = useCallback(async (firstId, secondId) => {

        const response = await postRequest(`${baseUrl}/chats`, JSON.stringify({firstId, secondId}));

        if(response.error) return console.lpg("server Error");

        setUserChat((prev) => [...prev, response]);
    },[])

    return <ChatContext.Provider value={{
        userChat,
        isUserChatsLoading,
        userChatsError,
        potentiaChats,
        createChat,
        CurrentChat,
        updateCurrentChat,
        messages,
        isMessagesLoding,
        isMessagesError,
        sendTextMessage
    }}>{children}</ChatContext.Provider>
}