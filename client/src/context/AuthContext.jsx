
import { useState, useEffect, useContext, createContext } from "react";

import axios from "axios";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user : null,
        token : ""
    })


    // Default value set to axios
    axios.defaults.headers.common["Authorization"] = auth?.token;

    useEffect(() => {

        const data = JSON.parse(localStorage.getItem("auth"));
        // console.log('data:', data)
        if(data) {
            setAuth({
                ...auth,
                user : data.user,
                token : data.token
            })
        }

        // If there will be any error come due to useEffect dependencis, So for that the below comment is for disable for executing next line
        // eslint-disable-next-line
    },[])


    const handleAuth = (data) => {
        // console.log('data:', data);
    }

    return (
        <AuthContext.Provider value={ [auth, setAuth, handleAuth] }>
            { children }
        </AuthContext.Provider>
    )
}

// Custom Hook

export const useAuth = () => {

    return useContext(AuthContext)
}