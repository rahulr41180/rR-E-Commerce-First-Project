
import { Layout } from "../../components/Layout/Layout"

import "../../css/RegisterPage.css";
import "../../css/LoginPage.css";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const LoginPage = () => {

    const [formData, setFormData] = useState({
        email : "",
        password : "",
    })

    const navigate = useNavigate();
    const location = useLocation();

    const [ auth, setAuth, handleAuth ] = useAuth();


    const handleChange = (event) => {
        const {name, value} = event.target;
        // console.log('value:', value)
        // console.log('name:', name)
        setFormData({
            ...formData,
            [name] : value
        })
    }
    
    // Form Function
    
    const handleSubmit = async (event) => {
        // console.log("event : ", event)
        event.preventDefault();
        // console.log("formData : ", formData);
        // toast.success("Register Successfully..");
        try {

            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, {
                email : formData.email,
                password : formData.password,
            });

            // console.log('res:', res.data)
            if(res.data.status) {
                toast.success(res.data.message);
                setAuth({
                    ...auth,
                    
                    user : res.data.user,
                    token : res.data.token
                })
                
                localStorage.setItem("auth", JSON.stringify(res.data));
                navigate(location.state || res.data.navigate);
            } else {
                toast.error(res.data.message);

                // console.log(res.data.devMessage);
                setFormData({
                    email : "",
                    password : "",
                })
                navigate(res.data.navigate);
            }

        } catch(error) {

            // console.log("Error in register page :", error.message);

            toast.error("Something went wrong ! Please try again..");
            setFormData({
                email : "",
                password : "",
            })
            navigate("/login");
        }
    }

    return (
        <Layout title={"Login | rR e-Com"}>
            <div className="form-container" style={{minHeight : "90vh"}}>
                <form onSubmit={handleSubmit}>
                    <h4 className="title">LOGIN FORM</h4>
                    <div className="mb-3">
                        <input required onChange={handleChange} value={formData.email} type="email" className="form-control" name="email" placeholder="Email" />
                    </div>

                    <div className="mb-3">
                        <input required onChange={handleChange} value={formData.password} type="password" className="form-control" name="password" placeholder="Password" />
                    </div>
                    <div className="mb-3">
                        <button type="button" className="btn btn-primary" onClick={() => {
                            navigate("/forgot-password")
                        }}>Forgot Password</button>
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </Layout>
    )
    
}