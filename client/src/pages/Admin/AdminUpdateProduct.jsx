
import { useState, useEffect } from "react";

import { Layout } from "../../components/Layout/Layout";
import { AdminMainu } from "../../components/Layout/AdminMainu";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Select } from "antd";
const { Option } = Select;

export const AdminUpdateProduct = () => {

    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const params = useParams();

    // console.log('categories:', categories)
    const [photo, setPhoto] = useState("");
    // console.log('photo:', photo)
    const [getAllCategories1, setGetAllCategories1] = useState("");
    // console.log('photo:', photo)
    const [formData, setFormData] = useState({

        name: "",
        description: "",
        price: 0,
        category: "",
        quantity: "",
        shipping: "",
        id: "",
        updatePhoto: false

    })
    // console.log('formData:', formData)

    const getSingleProduct = async () => {

        try {
            const { data } = await axios.get(`/api/v1/product/get-single-product/${params.pId}`);
            // console.log('data-2:', data);
            if (data.status) {
                setFormData({

                    ...formData,
                    name: data.product.name,
                    description: data.product.description,
                    price: data.product.price,
                    quantity: data.product.quantity,
                    shipping: data.product.shipping ? "1" : "0",
                    category: data.product.category._id,
                    id: data.product._id
                })
            }
        } catch (error) {

        }
    }

    useEffect(() => {

        getSingleProduct();

    }, []);

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

    const handleUpdateSubmit = async (event) => {

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
            productData.append("updatePhoto", formData.updatePhoto);

            photo && productData.append("photo", photo);

            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/product/update-product/${formData.id}`, productData);
            // console.log('data:', data)
            if (data.status) {
                toast.success(data.message);
                // console.log(data.result);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            // console.log(error);
            toast.error("Something went wrong in creation of product");

        }

    }

    // Product Delete Function :

    const handleDeleteProduct = async () => {
        try {
            // let answer = window.prompt("Are you sure want to delete this product ? ");
            // if (!answer) return;

            const { data } = await axios.delete(`/api/v1/product/delete-product/${formData.id}`);
            // console.log('data:', data);
            if (data.status) {
                toast.success(data.message);
                navigate("/dashboard/admin/products");
            } else {
                toast.error("Something went wrong in deleting product");
            }
        } catch (error) {

        }
    }

    return (
        <Layout title={"Update Product | rR e-Com"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMainu />

                    </div>
                    <div className="col-md-9">
                        <h3>Update Product</h3>
                        <div className="m-1 w-75">

                            <Select bordered={false}
                                placeholder="Select a category"

                                size="large"
                                showSearch
                                className="form-select mb-3"

                                value={formData.category}
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
                                    {photo ? photo.name : "Update Photo"}
                                    {/* image : only image will be acceptable
                                        /* : any type of image will be acceptable
                                    */}
                                    <input type="file" name="photo" id="" accept="image/*" onChange={(event) => {
                                        // In event files is array type

                                        // console.log('event.target:', event.target.files[0])
                                        // console.log(event.target);

                                        return (
                                            setPhoto(event.target.files[0]),
                                            setFormData({
                                                ...formData,
                                                updatePhoto: true
                                            })
                                        )

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
                                ) : <>
                                    <div className="text-center">
                                        <img src={`/api/v1/product/get-product-photo/${formData.id}`} alt="product photo" height={"200px"} className="img img-responsive" />
                                    </div>
                                </>}
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
                                <Select bordered={false} value={formData.shipping} showSearch id="shipping" className="form-select mb-3" placeholder="Select shipping status" onChange={(value) => {
                                    setFormData({
                                        ...formData,
                                        shipping: value
                                    })
                                }}>
                                    <Option value="1">Yes</Option>
                                    <Option value="0">No</Option>
                                </Select>
                            </div>

                            <div className="d-flex gap-2">
                                <div className="mb-3">
                                    <button onClick={handleUpdateSubmit} className="btn btn-primary">Update Product</button>
                                </div>

                                <div className="mb-3">
                                    <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#productDelete">Delete Product</button>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            
            <div class="modal fade" id="productDelete" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Delete Product</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Are you want to delete this product ?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                            <button onClick={handleDeleteProduct} type="button" class="btn btn-danger" data-bs-dismiss="modal" aria-label="Close">Delete Product</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )

}