
import { Layout } from "../../components/Layout/Layout";

import "../../css/RegisterPage.css";
import "../../css/LoginPage.css";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

export const ForgotSecretKey = () => {

    const [formData, setFormData] = useState({
        email : "",
        newSecretKey : ""
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

            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-secret-key`, {
                email : formData.email,
                newSecretKey : formData.newSecretKey,
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
                    
                    newSecretKey : "",
                })
                navigate(res.data.navigate);
            }

        } catch(error) {
            // console.log("Error in register page :", error.message);
            toast.error("Something went wrong ! Please try again..");
            setFormData({

                email : "",
                newSecretKey : "",
            })
            navigate("/forgot-secret-key");
        }
    }

    return (
        <Layout title={"Forgot - Secret key | rR e-Com"}>
            <div className="form-container" style={{minHeight : "90vh"}}>
                <form onSubmit={handleSubmit}>
                    <h4 className="title">RESET SECRET KEY</h4>
                    <div className="mb-3">
                        <input required onChange={handleChange} value={formData.email} type="email" className="form-control" name="email" placeholder="Email" />
                    </div>
                    <div className="mb-3">
                        <input required onChange={handleChange} value={formData.newSecretKey} type="text" className="form-control" name="newSecretKey" placeholder="New Secret Key" />
                    </div>
                    <button type="submit" className="btn btn-primary">Reset Secret Key</button>
                </form>
            </div>
        </Layout>
    )

}