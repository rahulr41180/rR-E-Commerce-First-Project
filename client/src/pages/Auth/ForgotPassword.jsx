
import { Layout } from "../../components/Layout/Layout";

import "../../css/RegisterPage.css";
import "../../css/LoginPage.css";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

export const ForgotPassword = () => {

    const [formData, setFormData] = useState({
        email : "",
        secretKey : "",
        newPassword : ""
    })

    const navigate = useNavigate();

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

            const res = await axios.post(`/api/v1/auth/forgot-password`, {
                email : formData.email,
                secretKey : formData.secretKey,
                newPassword : formData.newPassword
            });

            // console.log('res:', res.data)
            if(res.data.status) {
                toast.success(res.data.message);
                navigate(res.data.navigate);
            } else {
                toast.error(res.data.message);
                // console.log(res.data.devMessage);

                setFormData({
                    email : "",
                    secretKey : "",
                    newPassword : ""
                })
                navigate(res.data.navigate);
            }

        } catch(error) {

            // console.log("Error in register page :", error.message);

            toast.error("Something went wrong ! Please try again..");
            setFormData({
                email : "",
                secretKey : "",
                newPassword : "",
            })
            navigate("/forgot-password");
        }
    }

    return (
        <Layout title={"Forgot - Password | rR e-Com"}>
            <div className="form-container" style={{minHeight : "90vh"}}>
                <form onSubmit={handleSubmit}>
                    <h4 className="title">RESET PASSWORD</h4>
                    <div className="mb-3">
                        <input required onChange={handleChange} value={formData.email} type="email" className="form-control" name="email" placeholder="Email" />
                    </div>
                    <div className="mb-3">
                        <input required onChange={handleChange} value={formData.secretKey} type="text" className="form-control" name="secretKey" placeholder="Your Secret Key" />
                    </div>
                    <div className="mb-3">
                        <input required onChange={handleChange} value={formData.newPassword} type="password" className="form-control" name="newPassword" placeholder="New Password" />
                    </div>
                    <div className="mb-3">
                        <button type="button" className="btn btn-primary" onClick={() => {
                            navigate("/forgot-secret-key")
                        }}>Forgot Secret Key</button>
                    </div>
                    <button type="submit" className="btn btn-primary">Reset Password</button>
                </form>
            </div>
        </Layout>
    )

}