
import mongoose from "mongoose";

import braintreePaymentGatewayOrdersModel from "../models/braintreePaymentGatewayModel.js";

const gettingAllOrderController = async (req, res) => {

    try {
        const orders = await braintreePaymentGatewayOrdersModel.find({ buyer: req.user?._id })
            .populate({ path: "products.product", select: "name price" });

        if (orders) {
            res.status(200).send({
                status: true,

                orders: orders
            })
        }
    } catch (error) {
        console.log('error:', error.message);
        res.status(500).send({
            status: false,
            message: "Something went wrong to getting all orders",
            error: error.message

        })

    }
}

const gettingAllUsersOrderController = async (req, res) => {
    try {
        const orders = await braintreePaymentGatewayOrdersModel.find({})
            .populate([{ path: "products.product", select: "name price" }, { path: "buyer", select: "name email" }])

            .sort({ createdAt: "-1" })

        if (!orders) {
            return res.status(500).send({
                status: false,
                message: "Something went wrong please try again letter",
                error: error.message
            })
        } else {
            res.status(200).send({
                status: true,

                orders: orders
            })
        }
    } catch (error) {
        res.status(500).send({
            status: false,
            message: "Something went wrong please try again letter",

            error: error.message
        })
    }

}

const updatingOrderedProductStatusController = async (req, res) => {
    try {
        const { oId, pId } = req.params;

        console.log('pId:', pId);
        console.log('oId:', oId);
        const { updatedOrderedStatus } = req.body;
        console.log('updatedOrderedStatus:', updatedOrderedStatus);
        if(!oId || !pId || !updatedOrderedStatus) {
            return res.status(500).send({
                status : false,
                message : "Please changed the order status",
                error : error.message

            })
        }

        const updatedOrdered = await braintreePaymentGatewayOrdersModel.findByIdAndUpdate({ _id : oId},
            { $set : { "products.$[element].orderStatus" : updatedOrderedStatus}},
            { arrayFilters : [{ "element._id" : new mongoose.Types.ObjectId(pId)}], new : true}
        )

        res.status(201).send({
            status : true,
        })

    } catch (error) {
        console.log('error:', error)
        res.status(500).send({
            status: false,
            message: "Something went wrong please try again letter",

            error: error.message
        })
    }
}


export {
    gettingAllOrderController,
    gettingAllUsersOrderController,
    
    updatingOrderedProductStatusController
}