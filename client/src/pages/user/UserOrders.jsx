
import "../../css/UserOrders.css";

import { Layout } from "../../components/Layout/Layout";
import { UserMainu } from "../../components/Layout/UserMainu";
import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

export const UserOrders = () => {
    const [orders, setOrders] = useState([]);

    // console.log('orders:', orders)

    const navigate = useNavigate();

    useEffect(() => {
        gettingAllOrders();
    }, [])

    const gettingAllOrders = async () => {
        try {
            const { data } = await axios.get("/api/v1/braintree-payment-orders/getting-user-orders");
            // console.log('data:', data);
            if (data.status) {

                setOrders(data?.orders)
            }
        } catch (error) {
            // console.log('error:', error.message);
            toast.error(error?.response.data.message);
            
        }
    }

    return (

        <Layout title={"Your Orders | rR e-Com"}>
            <div className="container-fluid p-0">
                <div className="row m-3">
                    <div className="col-md-2">
                        <UserMainu />
                    </div>
                    <div className="col-md-10 d-flex flex-column">
                        <p className="text-center fs-4 m-0 mb-3">Your Previous Orders Here</p>
                        <div className="table-responsive">

                            <table className="table border_Silver table-hover table-bordered">
                                <thead className="table-dark">
                                    <tr className="align-middle text-center">
                                        <th scope="col" className="width2">#</th>
                                        <th scope="col" className="width10">Product</th>

                                        <th scope="col" className="width8">Details</th>
                                        <th scope="col" className="width6">Item Price</th>
                                        <th scope="col" className="width2">Bought Quantity</th>
                                        <th scope="col" className="width6">Delivery Status</th>
                                        <th scope="col" className="width6">Payment Status</th>
                                        <th scope="col" className="width8">Buy Date</th>
                                        <th scope="col" className="width8">Shop Again</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders?.map((element, index) => {
                                        return (
                                            <>

                                                <tr key={element?._id+index+2} className="table-striped">
                                                    <th className="fs-6 text-center" colSpan={10}>Order No. {index + 1}</th>
                                                </tr>
                                                {element?.products?.map((item, itemIndex) => {
                                                    return (
                                                        <tr key={item?._id+itemIndex+1} className="align-middle text-center">
                                                            <td scope="row">{itemIndex + 1}</td>
                                                            <td className="uo_table_row_image_box d-flex p-0"><img className="uo_table_row_image width100 height100" src={`/api/v1/product/get-product-photo/${item?.product?._id}`} alt="" /></td>
                                                            <td className="fs-6">{item?.product?.name}</td>
                                                            <td className="fs-6">₹ {item?.product?.price}</td>
                                                            <td className="fs-6">{item?.quantity}</td>
                                                            <td className="fs-6">{item?.orderStatus}</td>
                                                            <td className="fs-6">{element?.payment.success ? "Success" : "Failed"}</td>
                                                            <td className="fs-6">{(element?.createdAt).split("T")[0].split("-").reverse().join("-")}</td>
                                                            <td className="uo_table_row_delete_item">

                                                                <div className="width100 heigth100 d-flex justify-content-center align-items-center">
                                                                    <button className="btn btn-primary btn3" onClick={() => { navigate(`/product-details/${item?.product?._id}`) }}>Buy Again</button>
                                                                </div>
                                                            </td>

                                                        </tr>
                                                    )
                                                })}
                                            </>

                                        )
                                    })}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    )
}