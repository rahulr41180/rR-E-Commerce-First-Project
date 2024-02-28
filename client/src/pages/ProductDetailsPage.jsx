
import "../css/ProductDetailsPage.css"

import { Layout } from "../components/Layout/Layout";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import toast, { Toaster } from 'react-hot-toast';
import useCategories from "../Hooks/useCategory";
import axios from "axios";
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";


export const ProductDetailsPage = () => {

    const [cartItems, setCartItems, handleCart, handleCartQuantity, handleRemoveItem] = useCartContext();
    const [selectProduct, setSelectProduct] = useState({});
    // console.log('selectProduct:', selectProduct)

    const [similarProducts, setSimilarProduct] = useState([]);
    // console.log('similarProducts:', similarProducts)

    const { pId } = useParams();

    // console.log('pId:', pId)

    // const categories = useCategories();
    // console.log('categories:', categories)

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
    };

    useEffect(() => {
        getSelectedProduct();
    }, [pId])

    const getSelectedProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-single-product/${pId}`);
            // console.log('data:', data)
            if (data) {
                setSelectProduct(data);
                gettingSimilarProductFn(data?.product._id, data?.product.category._id);
            }

        } catch (error) {
            // console.log(error.message);
        }
    }

    // useEffect(() => {
    //     gettingSimilarProductFn();
    // },[selectProduct])

    const gettingSimilarProductFn = async (pId, cId) => {

        try {
            const { data } = await axios.get(`/api/v1/product/get-similar-product/${pId}/${cId}`)

            // console.log('data:', data)
            if (data) {
                setSimilarProduct(data.products);
            }
        } catch (error) {

        }

    }


    return (
        <Layout title={"Product Details || rR e-Com"}>
            <div className="container-fluid p-4 single_product_details border_blue">
                <div className="row single_product_details_row height100 border_blue">
                    <div className="d-flex flex-column justify-content-between gap-1 col-md-5 border_blue height100">
                        <div className="height75 border_blue_blue width100 d-flex justify-content-between gap-1">
                            <div className="width20 height100 border_blue"></div>
                            <div className="width80 height100 border_Silver selectedImage">
                                <img src={`/api/v1/product/get-product-photo/${selectProduct?.product?._id}`} className="selectedImage height100 width100" alt="" />

                            </div>
                        </div>
                        <div className="height25 border_blue width100"></div>
                    </div>
                    <div className="col-md-7 border_blue p-2 height100">

                        <p className="fw-semibold fs-5 p-0 m-0">{selectProduct?.product?.name}</p>
                        <p className="fw-normal fs-6 p-0 m-0">{selectProduct?.product?.description}</p>
                        <p className="fw-normal fs-6 p-0 m-0">₹ {selectProduct?.product?.price}</p>
                        <p className="fw-normal fs-6 p-0 m-0">{selectProduct?.product?.category?.name}</p>

                        <button onClick={() => { handleCart(selectProduct?.product); toast.success("This product has been added successfully in your cart"); }} class="btn btn-secondary">To CART</button>
                    </div>
                </div>

            </div>
            <div className={`${similarProducts?.length < 1 ? "container-fluid p-4 mt-4 similar_product10" : "container-fluid p-4 mt-4 similar_product"}`}>
                <p className="text-center fs-4 ms-0">Similar Products</p>
                {similarProducts.length < 1 ? (
                    <p className="text-center fs-5 ms-0">No Similar Product Found.....</p>
                ) : 
                <div className="row height92 similar_product_list">
                    <Slider {...settings}>
                        {similarProducts?.map((element, index) => {
                            return (
                                <div className="card border_Silver width20 height98 p-0 mt-1 me-4">
                                    <img src={`/api/v1/product/get-product-photo/${element?._id}`} class="card-img-top width100 height60 border_Silver" alt="..." />
                                    <div className="card-body height39 mt-1 p-2 d-flex flex-column">
                                        <h5 className="card-title">{element?.name.substring(0, 20)}...</h5>
                                        <p className="card-text">{element?.description.substring(0, 40)}...</p>
                                        <p className="card-text mt-1">₹ {element?.price}</p>
                                        <div className="card-detail-link d-flex flex-row">
                                            <button onClick={() => { handleCart(element); toast.success("This product has been added successfully in your cart"); }} class="btn btn-secondary">To CART</button>
                                            <Link className="btn btn-primary" to={`/product-details/${element?._id}`}>Details</Link>
                                        </div>
                                    </div>
                                </div>
                            )
                            
                        })}
                    </Slider>
                </div>
                }
            </div>
        </Layout>
    )
}