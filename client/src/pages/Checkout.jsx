
import { Layout } from "../components/Layout/Layout";

import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import DropIn from "braintree-web-drop-in-react";
import { useCartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate, useParams } from "react-router-dom";

export const Checkout = () => {

    const [clientToken, setClientToken] = useState("");
    // console.log('clientToken:', clientToken)
    const [cartItems, setCartItems, handleCart, handleCartQuantity, handleRemoveItem, totalCartPriceQuantity, setTotalCartPriceQuantity, setRemoveCartItemsStatus] = useCartContext();
    // console.log('cartItems:', cartItems)
    const [auth] = useAuth();
    const { tqtp } = useParams();
    // console.log('tqtp:', tqtp);
    const [instance, setInstance] = useState("");
    // console.log('instance:', instance)

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [cartProducts, setCartProducts] = useState([]);
    // console.log('cartProducts:', cartProducts)

    useEffect(() => {
        const objectArray = Object.entries(cartItems);
        // console.log('objectArray:', objectArray)
        const productArray = [];
        let i = 0;
        let j = objectArray.length - 1;
        
        while(i <= j) {
            if(i === j) {
                productArray.push({
                    product : objectArray[i][0],
                    quantity : Number(objectArray[i][1][1])
                })
                
            } else if(i !== j) {
                productArray.push({
                    product : objectArray[i][0],

                    quantity : Number(objectArray[i][1][1])
                }, {
                    product : objectArray[j][0],
                    quantity : Number(objectArray[j][1][1])
                })
            }
            i++;
            j--;

        }
        setCartProducts(productArray)
        // console.log('productArray:', productArray);
    },[auth])

    useEffect(() => {
        const gettingClientToken = async () => {
            try {
                const { data } = await axios.get("/api/v1/braintree-payment/client-token-generate");
                // console.log('data:', data)
                if (data.status) {

                    setClientToken(data?.clientToken?.clientToken);
                    setLoading(false);
                }
            } catch (error) {

                // console.log('error:', error.message);
                toast.error(error.response.data.message);
            }
        }
        gettingClientToken();

    }, [auth])

    const handlePayment = async () => {

        // console.log("payment");
        try {
            const { nonce } = await instance.requestPaymentMethod();

            if(nonce) {

                setLoading(true);
                const { data } = await axios.post(`/api/v1/braintree-payment/receive-payment`, {
                    cartItems : cartProducts,
                    
                    braintreeNonce : nonce,
                    totalPrice : Number(tqtp?.split("-")[1])
                })
                // console.log('data:', data)
                
                setLoading(false);
                if(data?.status) {
                    toast.success(data?.message);
                    localStorage.removeItem("rReCom_CartItems");
                    setRemoveCartItemsStatus(true);
                    navigate("/dashboard/user/orders");

                }
            }
            // console.log('nonce:', nonce);

        } catch(error) {
            // console.log("error :", error.message);
            setLoading(false);
            toast.error(error.response.data.message);
        }

    }

    return (
        <Layout title={"Checkout | rR e-Com"}>
            <div className="container-fluid c_container p-2 d-flex">
                <div className="width60 height100 border_blue p-2">

                    <h4 className="text-center m-0 mb-2">Please complete your payment for selected products</h4>
                    <div className={`width80 ${loading ? "height60" : ""} border_Silver p-3 m-auto`}>
                        {clientToken ?
                            <DropIn
                                options={{
                                    authorization: clientToken,
                                    paymentOptionPriority: ["card", "paypal"],
                                    paypal: { flow: "vault" },
                                }}
                                onInstance={(instance) => { return setInstance(instance) }}

                            />
                            :
                            <div className="width100 height85 border_black mb-2 d-flex justify-content-center align-items-center gap-4">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <div className="spinner-border text-secondary" role="status">
                                    <span className="visually-hidden">Loading...</span>

                                </div>
                            </div>
                        }
                        <button className="btn btn-primary" onClick={handlePayment} disabled={""}>Make Payment</button>

                    </div>
                </div>

                <div className="width40 height100 border_blue p-3">
                    {auth?.user ? <p className="fs-5 m-0 mb-2">Hi {auth?.token && auth?.user?.name}</p> : ""}
                    <p className="fs-5 m-0 mb-2">Total item quanties in your cart : {tqtp?.split("-")[0]}</p>

                    <p className="fs-5 m-0 mb-2">Total Price : ₹ {tqtp?.split("-")[1]}</p>
                </div>
            </div>
        </Layout>
    )
}