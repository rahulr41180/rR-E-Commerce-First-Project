
import "../css/ProductsBasedOnCategoryPage.css";

import { Layout } from "../components/Layout/Layout";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";

export const ProductBasedOnCategoryPage = () => {
    const { categoryName, cId } = useParams();
    // console.log('cId1:', cId)

    const [products, setProducts] = useState([]);
    // console.log('products:', products)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // console.log('cId2:', cId);
        // const gettingProductsBasedOnCategory = async () => {
        //     try {
        //         const { data } = await axios.get(`/api/v1/product/get-products-based-on-category/${cId}`);
        //         console.log('data:', data)

        //         if(!data.status) {
        //             toast.error(data.message);
        //         }
        //         setProducts(data?.products);
        //     } catch(error) {

        //     }
        // }

        gettingProductsBasedOnCategory();
    }, [cId])

    const gettingProductsBasedOnCategory = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-products-based-on-category/${cId}`);
            // console.log('data:', data)

            if (!data.status) {

                toast.error(data.message);
                setLoading(false);
                return;
            }
            setProducts(data?.products);
            
            setLoading(true);
        } catch (error) {
            // console.log(error.message);

        }
    }

    return (

        <Layout title={"Product Based On Category | rR e-Com"}>
            <div className="pbocp_container row mt-3 ps-4 pe-2">
                <div className="width100 p-0">
                    <h4 className="text-center">{categoryName} Based Products</h4>
                    {loading ?

                        <div id="grid-container" className="width100 m-0 row row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-6 g-3">
                            {products?.map((element, index) => {
                                return (
                                    <>
                                        <div className="col">
                                            <div className="card" key={index}>
                                                <img src={`/api/v1/product/get-product-photo/${element._id}`} className="card-img-top productCardImage" alt="..." style={{ border: "1px solid silver" }} />
                                                <div className="card-body d-flex flex-column">
                                                    <h5 className="card-title">{element.name.substring(0, 20)}...</h5>
                                                    <p className="card-text">{element.description.substring(0, 40)}...</p>
                                                    <p className="card-text mt-1">₹ {element.price}</p>
                                                    <div className="card-detail-link d-flex flex-row">
                                                        <Link to={""} class="btn btn-secondary">To CART</Link>
                                                        <Link className="btn btn-primary" to={`/product-details/${element._id}`}>Details</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                        :
                        <p className="text-center fs-5">No Products Found Please Choose Another Category Based Products</p>
                    }
                </div>
            </div>
        </Layout>
    )
 
    
}