import { useEffect,useState } from "react";
import { baseUrl, getRequest } from "../utils/servises";

export const useFetchRecipientUser = (chat, user) => {

    const [recipientUser, setRecipientUser] = useState(null);
    const [error, setError] = useState(null);

    // console.log(chat);

    const recipientId = chat?.members.find((id) => id !== user?._id);

    // console.log(recipientId);

    useEffect(() => {
        console.log(11232);
        const getUser = async () => {

            console.log(11232);

            if(!recipientId) return null;

            const response = await getRequest(`${baseUrl}/user/find/${recipientId}`);

            if(response.error) {
                return setError(error);
            }

            setRecipientUser(response);
        };

        getUser();
    },[recipientId]);

    return {recipientUser}
}