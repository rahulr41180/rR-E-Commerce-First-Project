
import "../css/HomePage.css"

import { Layout } from "../components/Layout/Layout";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Checkbox, Pagination } from "antd";
import toast, { Toaster } from 'react-hot-toast';
import { PriceFilter } from "../Calculation/PricesFilter";
import { useCartContext } from "../context/CartContext";

export const HomePage = () => {

    const [auth, setAuth, handleAuth] = useAuth();
    const [cartItems, setCartItems, handleCart] = useCartContext();
    // console.log('auth:', auth)
    const [products, setProducts] = useState([]);
    // console.log('products:', products)
    const [categories, setCategories] = useState([]);
    // console.log('categories:', categories)

    const [filterValue, setFilterValue] = useState({
        categoriesFilter: [],
        priceFilter: []
    });
    const [totalProduct, setTotalProduct] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(10)

    // console.log('filterValue:', filterValue)

    useEffect(() => {
        getTotalProductCount();
    }, [])

    const getTotalProductCount = async () => {
        try {
            const { data } = await axios.get("/api/v1/product/product-count");
            // console.log('data-product:', data)
            if (data.status) {
                // setTotalPages(Math.ceil(data.totalProduct) / 2);

                setTotalProduct(data.totalProduct);
            }
        } catch (error) {

        }
    }


    // handleAuth("Hello World");
    useEffect(() => {
        getAllProductsFn();
    }, [])

    const getAllProductsFn = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/product-pagination/${currentPage}/${itemPerPage}`);
            // console.log('data:', data)
            if (data.status) {
                setProducts(data.products);
            }

        } catch (error) {

        }
    }


    const getAllCategories = async () => {
        
        try {
            const { data } = await axios.get(`/api/v1/category/get-all-categories`);
            // Optional Chaining
            if (data?.status) {

                setCategories(data.allCategories);
            }
            console.log("data :", data);

        } catch (error) {
            
            // console.log(error);
            toast.error("Something went wrong in getting categories");
        }
    }

    useEffect(() => {
        getAllCategories();
    }, [])

    const handleFilterRequest = async () => {
        try {
            const { data } = await axios.post(`/api/v1/product/products-filter/${currentPage}/${itemPerPage}`, {

                categoriesFilter: filterValue.categoriesFilter,

                priceFilter: filterValue.priceFilter
            });
            // console.log('data:', data)
            if (data.status) {
                setProducts(data.products);
            }
        } catch (error) {

        }
    }

    const handleCategoryFilter = (checkedValue, id) => {
        let all = [...filterValue.categoriesFilter]
        if (checkedValue) {

            all.push(id);
        } else {
            all = all.filter((element) => {
                return element !== id
            })
        }
        setFilterValue({
            ...filterValue,
            categoriesFilter: all
        })
    }

    const handlePriceFilter = (checkStatus, id, value) => {
        let all = [...filterValue.priceFilter]
        if (checkStatus) {
            all.push(value);
        } else {
            all = all.filter((element) => {

                return element !== value
            })
        }
        setFilterValue({
            ...filterValue,
            priceFilter: all
        })
    }

    useEffect(() => {
        if (filterValue.categoriesFilter.length || filterValue.priceFilter.length) handleFilterRequest();
    }, [filterValue.categoriesFilter, filterValue.priceFilter])


    useEffect(() => {
        if (!filterValue.categoriesFilter.length && !filterValue.priceFilter.length) getAllProductsFn();
    }, [filterValue.categoriesFilter, filterValue.priceFilter])

    return (
        <Layout title={"All Products | Best Offers | rR e-Com"}>
            <div className="row mt-3">
                <div className="col-md-3">
                    <h4 className="text-center">Filters</h4>
                    <div className="d-flex flex-column" id="category-filter">
                        <h6><u>Filter By Categories</u></h6>
                        {categories.map((element, index) => {
                            return (
                                    <Checkbox key={index + 1} onChange={(event) => {
                                        handleCategoryFilter(event.target.checked, element._id)
                                    }}>{element.name}</Checkbox>
                                
                            )
                        })}
                    </div>

                    <div className="d-flex flex-column mt-2" id="price-filter">
                        <h6><u>Filter By Price</u></h6>
                        {PriceFilter.map((element, index) => {
                            return (
                                

                                    <Checkbox key={index - 1} onChange={(event) => {
                                        handlePriceFilter(event.target.checked, element._id, element.value)
                                    }}>{element.name}</Checkbox>
                                
                            )
                        })}
                    </div>
                    <div className="d-inline-flex mt-2" id="reset-filter-button">
                        <button type="button" className="btn btn-danger" onClick={() => window.location.reload()}>Reset Filter</button>
                    </div>
                </div>

                <div className="col-md-9">
                    <h4 className="text-center">All Products</h4>
                    <div id="grid-container" className="row row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 g-4">
                        {products?.map((element, index) => {
                            return (
                                
                                    <div className="col" key={element?._id}>
                                        <div className="card">
                                            
                                            <img src={`/api/v1/product/get-product-photo/${element._id}`} className="card-img-top productCardImage" alt="..." style={{ border: "1px solid silver" }} />
                                            <div className="card-body d-flex flex-column">
                                                <h5 className="card-title">{element.name.substring(0, 20)}...</h5>
                                                <p className="card-text">{element.description.substring(0, 40)}...</p>
                                                <p className="card-text mt-1">₹ {element.price}</p>
                                                <div className="card-detail-link d-flex flex-row">

                                                    <button onClick={() => { handleCart(element); toast.success("This product has been added successfully in your cart") }} className="btn btn-secondary">To CART</button>
                                                    <Link className="btn btn-primary" to={`/product-details/${element._id}`}>Details</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                               
                            )
                        })}
                    </div>


                    <div className="d-flex justify-content-center mt-4">
                        <Pagination showSizeChanger={false} defaultCurrent={1} total={totalProduct} pageSize={itemPerPage} onChange={(page, pageSize) => {
                            // console.log('page:', page, "pageSize :", pageSize)
                            setCurrentPage(page);
                            setItemPerPage(pageSize);

                            if (!filterValue.categoriesFilter.length && !filterValue.priceFilter.length) getAllProductsFn();
                            if (filterValue.categoriesFilter.length || filterValue.priceFilter.length) handleFilterRequest();
                        }} />
                    </div>
                </div>
            </div>
        </Layout>
    )

}