
import "../../css/AdminOrder.css";

import { Layout } from "../../components/Layout/Layout";
import { AdminMainu } from "../../components/Layout/AdminMainu";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";

export const AdminOrders = () => {


    const [orders, setAllOrders] = useState([]);
    const [orderStatus, setOrderStatus] = useState("");
    // console.log('orderStatus:', orderStatus);
    const navigate = useNavigate();

    useEffect(() => {
        gettingAllOrders();
    }, [])


    const gettingAllOrders = async () => {
        try {
            const { data } = await axios.get("/api/v1/braintree-payment-orders/getting-all-users-orders");
            // console.log('data:', data)
            if (data.status) {
                setAllOrders(data?.orders);
            }
        } catch (error) {
            // console.log("error :", error.message);

            toast.error(error?.response.data.message);
        }
    }

    const handleChangedOrderStatus = async (oId, pId) => {
        try {
            const { data } = await axios.put(`/api/v1/braintree-payment-orders/updating-ordered-product-status/${oId}/${pId}`,{
                updatedOrderedStatus : orderStatus?.split(",")[1]
            })

            // console.log("data1 :", data);
            if(data.status) {
                setOrderStatus("");
                toast.success("The product order status has been updated successfully");
                gettingAllOrders();
            }
        } catch(error) {
            toast.error(error?.response.data.message);
            // console.log("error.message :", error.message);

        }
    }

    return (
        <Layout title={"All Orders | rR e-Com"}>
            <div className="container-fluid p-0">
                <div className="row m-2">
                    <div className="col-md-2">
                        <AdminMainu />

                    </div>
                    <div className="col-md-10 d-flex flex-column">
                        <p className="text-center fs-4 m-0 mb-3">Your Previous Orders Here</p>
                        <div className="table-responsive">
                            <table className="table border_Silver table-hover table-bordered">
                                <thead className="table-dark">
                                    <tr className="align-middle text-center">
                                        <th scope="col" className="width2">#</th>
                                        <th scope="col" className="width2">User</th>

                                        <th scope="col" className="width9">Product</th>
                                        <th scope="col" className="width8">Product Details</th>
                                        {/* <th scope="col" className="width5">Item Price</th> */}
                                        <th scope="col" className="width0">Bought Quantity</th>
                                        <th scope="col" className="width0">Payment Status</th>
                                        <th scope="col" className="width6">Buy Date</th>
                                        {/* <th scope="col" className="width5">Delivery Status</th> */}
                                        <th scope="col" className="width16">Update Delivery Status</th>
                                    </tr>

                                </thead>
                                <tbody>
                                    {orders?.map((element, index) => {
                                        return (
                                            <>
                                                <tr key={element?._id + index + 2} className="table-striped">
                                                    <th className="fs-6 text-center" colSpan={10}>Order No. {index + 1}</th>
                                                </tr>
                                                {element?.products?.map((item, itemIndex) => {

                                                    return (
                                                        <tr key={item?._id + itemIndex + 1} className="align-middle text-center">
                                                            <td scope="row">{itemIndex + 1}</td>
                                                            <td className="fs-6">{element?.buyer?.name + "\n" + element?.buyer?.email}</td>
                                                            <td className="ao_table_row_image_box d-flex p-0"><img className="uo_table_row_image width100 height100" src={`/api/v1/product/get-product-photo/${item?.product?._id}`} alt="" /></td>
                                                            <td className="fs-6">{item?.product?.name} <br /> Price : ₹ {item?.product?.price}</td>
                                                            {/* <td className="fs-6">₹ {item?.product?.price}</td> */}
                                                            <td className="fs-6">{item?.quantity}</td>
                                                            <td className="fs-6">{element?.payment.success ? "Success" : "Failed"}</td>

                                                            <td className="fs-6">{(element?.createdAt).split("T")[0].split("-").reverse().join("-")}</td>
                                                            <td className="ao_select_order_status_td">
                                                                <div className="width100 height100 d-flex flex-column justify-content-center align-items-center gap-2">
                                                                    <p className="m-0 p-0">Current Status : {item?.orderStatus}</p>
                                                                    <select className="form-select ao_select1 width90" name="" id="" onChange={(event) => {
                                                                        // console.log(item?._id + "," + event.target.value);
                                                                        setOrderStatus(event.target.value !== "" ? item?._id + "," + event.target.value : "");
                                                                    }
                                                                    }>

                                                                        <option className="ao_select_order_status_op1" value={""}>Update Status</option>
                                                                        <option className="ao_select_order_status_op1" value={"Not Process"}>Not Process</option>
                                                                        <option className="ao_select_order_status_op1" value={"Processing"}>Processing</option>
                                                                        <option className="ao_select_order_status_op1" value={"Shipped"}>Shipped</option>
                                                                        <option className="ao_select_order_status_op1" value={"Delivered"}>Delivered</option>
                                                                        <option className="ao_select_order_status_op1" value={"Canceled"}>Canceled</option>
                                                                    </select>
                                                                    <button className="btn btn-primary ao_select1_btn1" disabled={item?._id === orderStatus.split(",")[0] ? false : true} onClick={() => handleChangedOrderStatus(element?._id, item?._id)}>Update Status</button>
                                                                </div>

                                                            </td>
                                                            {/* <td className="uo_table_row_delete_item">
                                                                <div className="width100 heigth100 d-flex justify-content-center align-items-center">
                                                                    <button className="btn btn-primary btn3" onClick={() => { navigate(`/product-details/${item?.product?._id}`) }}>Buy Again</button>
                                                                </div>
                                                            </td> */}
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