
import "../../css/HomePage.css";

import { AdminMainu } from "../../components/Layout/AdminMainu";
import { Layout } from "../../components/Layout/Layout";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export const AdminProduct = () => {

    
    const [products, setProducts] = useState([]);
    // console.log('products:', products)

    // LifeCycle Method :

    useEffect(() => {
        getAllProducts();
    }, []);

    // Getting All Products Function
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get("/api/v1/product/get-product");

            if (data?.status) {
                setProducts(data.product);
            } else {
                toast.error("Something went wrong please try again");
            }
        } catch (error) {
            toast.error("Something went wrong please try again");
        }

    }

    return (
        <Layout>
                <div className="row mt-3">
                    <div className="col-md-3">
                        <AdminMainu />
                    </div>
                    <div className="col-md-9">

                        <h1 className="text-center">All Products List</h1>
                        <div className="row row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4 row-cols-xxl-5 g-4">
                            {products.map((element, index) => {
                                return (
                                    <>
                                        <div className="col">
                                            <div className="card" key={index}>

                                                <img src={`/api/v1/product/get-product-photo/${element._id}`} className="card-img-top productCardImage" alt="..." style={{ border: "1px solid silver" }} />
                                                <div className="card-body d-flex flex-column">
                                                    <h5 className="card-title">{element.name}</h5>
                                                    <p className="card-text">{element.description}</p>
                                                    <p className="card-text mt-2">₹ {element.price}</p>
                                                    <div className="card-detail-link d-flex flex-row">
                                                        <Link className="btn btn-primary" to={`/dashboard/admin/product-details/${element._id}`}>Details</Link>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    </div>
                </div>

        </Layout>
    )
}