
import { Layout } from "../../components/Layout/Layout"

import "../../css/RegisterPage.css";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {

    const [formData, setFormData] = useState({

        name : "",
        email : "",
        password : "",
        address : "",
        phone : "",
        secretKey : ""
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

            const res = await axios.post("/api/v1/auth/register", {

                name : formData.name,
                email : formData.email,
                password : formData.password,
                address : formData.address,
                phone : formData.phone,
                secretKey : formData.secretKey
            });


            if(res.data.status) {
                toast.success(res.data.message);
                navigate(res.data.navigate);
            } else {
                
                toast.error(res.data.message);
                // console.log(res.data.devMessage);
                setFormData({

                    name : "",
                    secretKey : "",
                    email : "",
                    password : "",
                    phone : "",
                    address : ""
                })
                navigate(res.data.navigate);
            }

        } catch(error) {
            // console.log("Error in register page :", error.message);
            toast.error("Something went wrong ! Please try again..");
        }
    }

    return (
        <Layout title={"Register | rR e-Com"}>

            <div className="form-container" style={{minHeight : "90vh"}}>
                <form onSubmit={handleSubmit}>
                    <h4 className="title">REGISTER FORM</h4>
                    <div className="mb-3">
                        <input required onChange={handleChange} value={formData.name} type="text" className="form-control" name="name" placeholder="Full Name" />
                    </div>
                    <div className="mb-3">
                        <input required onChange={handleChange} value={formData.email} type="email" className="form-control" name="email" placeholder="Email" />
                    </div>
                    <div className="mb-3">
                        <input required onChange={handleChange} value={formData.password} type="password" className="form-control" name="password" placeholder="Password" />
                    </div>

                    <div className="mb-3">   
                        <input required onChange={handleChange} value={formData.phone} type="number" className="form-control" name="phone" placeholder="Number" />
                    </div>
                    <div className="mb-3">
                        <input required onChange={handleChange} value={formData.address} type="text" className="form-control" name="address" placeholder="Address" />
                    </div>
                    <div className="mb-3">
                        <input required onChange={handleChange} value={formData.secretKey} type="text" className="form-control" name="secretKey" placeholder="Enter Your Secret Key" />
                    </div>

                    <div className="mb-3">
                        <button type="button" className="btn btn-primary" onClick={() => {
                            navigate("/login");
                        }}>Already have an account</button>
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
            </div>
        </Layout>
    )

}