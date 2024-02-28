
import "../css/Checkout.css";

import { Layout } from "../components/Layout/Layout";
import "../css/CartPage.css";
import { useCartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';

export const CartPage = () => {


    const [cartItems, setCartItems, handleCart, handleCartQuantity, handleRemoveItem, totalCartPriceQuantity, setTotalCartPriceQuantity] = useCartContext();

    const [auth] = useAuth();
    // console.log('auth:', auth)

    const navigate = useNavigate();

    useEffect(() => {
        const objectArray = Object.entries(cartItems);
        // console.log('objectArray1:', objectArray);

        let totalPrice = 0;
        let totalQuantity = 0;
        let i = 0;
        let j = objectArray.length - 1;

        while (i <= j) {
            if (i !== j) {
                totalPrice = totalPrice + (objectArray[i][1][0].price * objectArray[i][1][1]) + (objectArray[j][1][0].price * objectArray[j][1][1]);
                totalQuantity = totalQuantity + (objectArray[i][1][1] + objectArray[j][1][1]);
            } else if (i === j) {
                totalPrice = totalPrice + (objectArray[i][1][0].price * objectArray[i][1][1]);
                totalQuantity = totalQuantity + objectArray[i][1][1];
            }
            i++;

            j--;
        }
        setTotalCartPriceQuantity({
            totalPrice: totalPrice,
            totalQuantity: totalQuantity
        })
    }, [cartItems])


    const handleCheckout = (totalPrice) => {
        if (auth?.user === null && auth?.token === "") {
            toast.error("Please login your account");

            navigate("/login");
        } else {
            // console.log('totalPrice:', totalPrice);
        }

    }

    return (
        <Layout title={"Cart | rR e-Com"}>
            {Object.entries(cartItems)?.length < 1 ?
                <div className="container-fluid border_blue cp_container2 d-flex justify-content-center align-items-center flex-column">
                    <p className="text-center p-0 m-0 mb-1 fs-2">Your cart is empty.</p>
                    <Link to={"/"} className="text-center Link-0 m-0 fs-5">Continue Shooping</Link>
                </div>

                :
                <div className="container-fluid border_blue cp_container d-flex p-0 m-0">
                    <div className="width70 border_blue p-4">
                        <div className="table-responsive border_blue">
                            <table className="table border_Silver table-hover table-bordered">
                                
                                <thead className="table-dark">
                                    <tr className="align-middle text-center">
                                        <th scope="col" className="width4">#</th>
                                        <th scope="col" className="width18">Product</th>
                                        <th scope="col" className="width14">Details</th>
                                        <th scope="col" className="width8">Item Price</th>
                                        <th scope="col" className="width0">Total Quantity</th>
                                        <th scope="col" className="width10">Total Items Price</th>
                                        <th scope="col" className="width14">Manage Quantity</th>

                                        <th scope="col" className="width10">Delete Item</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(cartItems)?.map((element, index) => {
                                        return (
                                            <tr key={element[0]} className="align-middle text-center">
                                                <th scope="row">{index + 1}</th>
                                                <th className="cp_table_row_image_box d-flex p-0"><img className="cp_table_row_image width100 height100" src={`/api/v1/product/get-product-photo/${element[1][0]?._id}`} alt="" /></th>
                                                
                                                <th className="fs-6">{element[1][0]?.name}</th>
                                                <th className="fs-6">₹ {element[1][0]?.price}</th>
                                                <th className="fs-6">{element[1][1]}</th>

                                                <th className="fs-6">₹ {element[1][0]?.price * element[1][1]}</th>
                                                <th className="cp_table_row_quantity_manage_box">
                                                    <div className="width100 height100 d-flex gap-2 justify-content-center align-items-center">
                                                        <button className="btn btn-danger btn1" onClick={() => { handleCartQuantity(element, "subtract"); }}>-</button>
                                                        <p className="fs-6 m-0 p-0">{element[1][1]}</p>

                                                        <button className="btn btn-primary btn2" onClick={() => { handleCartQuantity(element, "addition"); }}>+</button>
                                                    </div>
                                                </th>

                                                <th className="cp_table_row_delete_item">
                                                    <div className="width100 heigth100 d-flex justify-content-center align-items-center">

                                                        <button className="btn btn-danger btn3" onClick={() => { handleRemoveItem(element); toast.success("Your item has been removed successfully") }}>Remove</button>
                                                    </div>
                                                </th>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="width30 border_blue p-4">

                        {auth?.user ? <p className="fs-5 m-0 mb-2">Hi {auth?.token && auth?.user?.name}</p> : ""}
                        <p className="fs-5 m-0 mb-2">Total item quanties in your cart : {totalCartPriceQuantity?.totalQuantity}</p>
                        <p className="fs-5 m-0 mb-2">Total Price : ₹ {totalCartPriceQuantity?.totalPrice}</p>
                        {auth?.token ?
                            <>
                                <Link to={`/checkout/${totalCartPriceQuantity?.totalQuantity+"-"+totalCartPriceQuantity?.totalPrice}`} className="btn btn-success fs-5 width100">CHECKOUT</Link>
                                <p className="fs-4 m-0 mb-2">Your shipping address is :</p>
                                <p className="fs-5 m-0 mb-2">{auth?.user?.address}</p>
                                <Link to={"/dashboard/user/profile"} className="btn btn-success fs-5 width100">Update Address</Link>
                            </>
                            :
                            <button onClick={() => { navigate("/login", { state : "/cart" })}} className="btn btn-success fs-5 width100">Please do login to checkout</button>
                        }

                    </div>
                </div>
            }

        </Layout>
    )

}