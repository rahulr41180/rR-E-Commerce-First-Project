
import { useState, useEffect, useCallback } from "react";

import { Layout } from "../../components/Layout/Layout";
import { AdminMainu } from "../../components/Layout/AdminMainu";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";
const { Option } = Select;

export const AdminCreateProduct = () => {

    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    // console.log('categories:', categories)
    const [photo, setPhoto] = useState("");
    const [getAllCategories1, setGetAllCategories1] = useState("");
    // console.log('photo:', photo)
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: 0,
        category: "",
        quantity: "",
        shipping: ""

    })
    // console.log('formData:', formData)

    // Getting All Categories Function() :

    const getAllCategories = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-all-categories`);
            // Optional Chaining
            if (data?.status) {

                setCategories(data.allCategories);
            }
            // console.log("data :", data);

        } catch (error) {
            // console.log(error);
            toast.error("Something went wrong in getting categories");
        }
    }

    useEffect(() => {
        getAllCategories();
    }, [])

    const handleChange = (event) => {

        const { value, id } = event.target;
        setFormData({
            ...formData,

            [id]: value
        })
    }

    // Product Create Function :

    const handleCreateSubmit = async (event) => {

        // Here we are sending photo data to backend so for that 
        // We can use FormData property from browser because browser has default property for FormData
        // console.log('event:', event)

        event.preventDefault();
        try {
            // If We don't want to use FormData property than we can use
            // HTML form element by doing : wrap all input and select tags within form element and add
            // handleCreateSubmit function on form by onSubmit event.

            const productData = new FormData();
            // for creating the FormData(); instance that's by I am using new keyword
            productData.append("name", formData.name);
            productData.append("description", formData.description);
            productData.append("price", formData.price);
            productData.append("category", formData.category);
            productData.append("quantity", formData.quantity);
            productData.append("shipping", formData.shipping);
            productData.append("photo", photo);

            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/create-product`, productData);
            // console.log('data:', data)
            if (data.status) {
                toast.success(data.message);
                // console.log(data.result);

                navigate("/dashboard/admin/products");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            // console.log(error);
            toast.error("Something went wrong in creation of product");
        }
    }

    return (
        <Layout title={"Create Product | rR e-Com"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMainu />

                    </div>
                    <div className="col-md-9">
                        <h3>Create Product</h3>
                        <div className="m-1 w-75">

                                <Select bordered={false}
                                    placeholder="Select a category"
                                    size="large"
                                    showSearch
                                    className="form-select mb-3"

                                    onChange={(value) => {
                                        return (
                                            setFormData({
                                                ...formData,
                                                category: value
                                            })
                                        )
                                    }}>
                                    {categories.map((element, index) => {

                                        return (
                                            <>

                                                <Option key={element._id} value={element._id}>{element.name}</Option>
                                            </>
                                        )
                                    })}
                                </Select>


                                <div className="mb-3">

                                    <label className="btn btn-outline-secondary col-md-12">
                                        {photo ? photo.name : "Upload Photo"}
                                        {/* image : only image will be acceptable
                                        /* : any type of image will be acceptable
                                    */}
                                        <input type="file" name="photo" id="" accept="image/*" onChange={(event) => {
                                            // In event files is array type
                                            // console.log('event.target:', event.target.files[0])
                                            // console.log(event.target);
                                            return setPhoto(event.target.files[0])

                                        }} hidden />
                                    </label>
                                </div>
                                <div className="mb-3">
                                    {photo ? (
                                        <>
                                            {/* We can't display image by using directly from photo state
                                        So for that we can get address of image from browser url because browser url have some property by using that
                                        we take address of image
                                    */}
                                            <div className="text-center">
                                                <img src={URL.createObjectURL(photo)} alt="product photo" height={"200px"} className="img img-responsive" />
                                            </div>
                                        </>
                                    ) : ""}
                                </div>

                                <div className="mb-3">
                                    <input type="text" value={formData.name} id="name" placeholder="write product name" className="form-control" onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <textarea type="text" value={formData.description} id="description" placeholder="write product description" className="form-control" onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <input type="number" value={formData.price} id="price" placeholder="write product price" className="form-control" onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <input type="number" value={formData.quantity} id="quantity" placeholder="write product quantity" className="form-control" onChange={handleChange} />

                                </div>
                                <div className="mb-3">
                                    <Select bordered={false} showSearch id="shipping" className="form-select mb-3" placeholder="Select shipping status" onChange={(value) => {
                                        setFormData({
                                            ...formData,
                                            shipping: value
                                        })
                                    }}>
                                        <Option value="1">Yes</Option>
                                        <Option value="0">No</Option>
                                    </Select>
                                </div>

                                <div className="mb-3">
                                    <button onClick={handleCreateSubmit} className="btn btn-primary">Create Product</button>
                                </div>

                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    )
}