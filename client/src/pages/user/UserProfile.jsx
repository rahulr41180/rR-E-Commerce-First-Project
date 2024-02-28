
import "../../css/UserProfile.css";

import { useState, useEffect } from "react";
import { Layout } from "../../components/Layout/Layout";
import { UserMainu } from "../../components/Layout/UserMainu";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";

export const UserProfile = () => {


    const [updateForm, setUpdateForm] = useState(false);
    // console.log('updateForm:', updateForm);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        phone: "",
    });

    // console.log('formData:', formData);
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        setFormData({
            ...formData,
            name : auth.user?.name,
            email : auth.user?.email,
            address : auth.user?.address,
            phone : auth.user?.phone
        })
    },[updateForm])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleLogOut = () => {

        setAuth({
            ...auth,
            user: null,
            token: ""
        })
        localStorage.removeItem("auth");
    }
    
    const handleSubmit = async (event) => {

        event.preventDefault();
        // console.log("formData :", formData);
        try {
            const { data } = await axios.put("/api/v1/auth/update-profile", {

                name : formData.name,
                address : formData.address,                
                email : formData.email,
            })

            // console.log('data:', data)
            if(data?.status) {
                toast.success("Your profile has been updated. Please login again.....");
                handleLogOut();

                setUpdateForm(false);
                navigate("/login");
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            // console.log("error :", error.message);
        }
    }

    return (

        <Layout title={"Your Profile | rR e-Com"}>
            <div className="container-fluid p-0">
                <div className="row m-3">
                    <div className="col-md-3">
                        <UserMainu />
                    </div>
                    {updateForm ?
                        <div className="col-md-9 up_form_container p-3">
                            <form onSubmit={handleSubmit} className="height100">

                                <h4 className="title">UPDATE FORM</h4>
                                <div className="mb-3">
                                    <input required onChange={handleChange} value={formData.name} type="text" className="form-control" name="name" placeholder="Update Full Name" />
                                </div>
                                <div className="mb-3">
                                    <input required onChange={handleChange} value={formData.email} type="email" className="form-control" name="email" placeholder="Update Email" disabled/>
                                </div>
                                <div className="mb-3">
                                    <input required onChange={handleChange} value={formData.phone} type="number" className="form-control" name="phone" placeholder="Update Number" disabled/>

                                </div>
                                <div className="mb-3">
                                    <input required onChange={handleChange} value={formData.address} type="text" className="form-control" name="address" placeholder="Update Address" />
                                </div>
                                <button type="submit" className="btn btn-primary">Update Profile</button>
                            </form>
                        </div> 
                        :
                        <div className="col-md-9 border_blue up_details_container">

                            <p className="fs-5 m-0 mb-1">Name : {auth.user?.name}</p>
                            <p className="fs-5 m-0 mb-1">Email : {auth.user?.email}</p>
                            <p className="fs-5 m-0 mb-1">Address : {auth.user?.address}</p>
                            <p className="fs-5 m-0 mb-1">Phone : {auth.user?.phone}</p>
                            <button className="btn btn-primary" onClick={() => setUpdateForm(true)}>Update Profile</button>
                        </div>
                    }
                </div>
            </div>

        </Layout>
    )
}