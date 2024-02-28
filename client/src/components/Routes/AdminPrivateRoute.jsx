
import { useState, useEffect } from "react";

import { useAuth } from "../../context/AuthContext";
// For viewing nested routing so for that we can use <Outlet />
import { Outlet } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import { Spinner } from "../Spinner";

export const AdminPrivateRoute = () => {
    const [ok, setOk] = useState(false);

    const [path, setPath] = useState("/login");
    
    // console.log('ok:', ok)
    const [auth, setAuth] = useAuth();
    // console.log('auth:', auth)
    // console.log('auth?.token:', auth?.token)
    useEffect(() => {
        // console.log("useEffect running..")
        const authCheck = async () => {
            
            // console.log("Function Calling..")
            try {
                
                const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/admin-auth`, {
                    // Have seted common Authorization value of headers in AuthContext
                    // headers : {
                    //     "Authorization" : auth?.token
                    // }
                })

                // console.log('res.data.protected:', res.data.protected)

                if(res.data.protected) {
                    setOk(true);
                } else {
                    setOk(false);
                    setPath("/");
                    toast.error(res.data.message);
                }
            } catch(error) {
                setPath("/");
                
                toast.error("UnAuthorized Access..");
            }
        }
        if(auth?.token) {
            authCheck();
        } else {
            // console.log("useEffect not running..")
        }
    },[auth?.token])
        
    // console.log('ok2:', ok)

    return ok ? <Outlet /> : <Spinner path={path} />
}