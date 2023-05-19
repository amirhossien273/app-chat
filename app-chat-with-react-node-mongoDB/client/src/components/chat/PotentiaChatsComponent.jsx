import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";


const PotentiaChatsComponent = () => {

    const {user} = useContext(AuthContext);
    const {potentiaChats, createChat} = useContext(ChatContext)

    return (<>
    <div className="all-users">
        {potentiaChats && potentiaChats.map((u, index) => {
            return (
                <div className="btn btn-success" key={index} onClick={() => createChat(user._id, u._id)}>
                    {u.name}
                    <span className="useronline"></span>
                </div>
            )
        })}
    </div>
    </>);
}

export default PotentiaChatsComponent;