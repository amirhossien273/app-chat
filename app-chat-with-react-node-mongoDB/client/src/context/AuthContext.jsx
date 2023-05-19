import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utils/servises";
import { useReducer } from "react";

export const AuthContext = createContext();


export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [registreError, setRegisterError] = useState(null);
    const [isRegisterLoding, setIsRegisterLoding] = useState(false);
    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [loginError, setLoginError] = useState(null);
    const [isLoginLoding, setIsLoginLoding] = useState(false);
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        const user = localStorage.getItem("User");
        setUser(JSON.parse(user));
    },[]);

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, []);

    const logoutUser = useCallback(() => {
        localStorage.removeItem("User");
        setUser(null);
    }, []);

    const registerUser = useCallback(async (e) => {
        e.preventDefault();

        setIsRegisterLoding(true);
        setRegisterError(null);

         const response = await postRequest(`${baseUrl}/user/register`, JSON.stringify(registerInfo));

         setIsRegisterLoding(false);
         if(response.error){
            return setRegisterError(response);
         }

         localStorage.setItem("User", JSON.stringify(response));
         setUser(response);
    }, [registerInfo]);

    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info);
    }, []);

    const loginUser = useCallback(async (e) => {
        e.preventDefault();

        setIsLoginLoding(true);
        setLoginError(null);
        const response = await postRequest(`${baseUrl}/user/login`, JSON.stringify(loginInfo));

        setIsLoginLoding(false);
        if(response.error){
           return setLoginError(response);
        }

        localStorage.setItem("User", JSON.stringify(response));
        setUser(response);
    },[loginInfo]);

    return <AuthContext.Provider value={{
        user, 
        registerInfo, 
        updateRegisterInfo, 
        registerUser, 
        registreError, 
        logoutUser, 
        loginInfo,
        updateLoginInfo,
        loginError, 
        loginUser
    }}>{children}</AuthContext.Provider>
}