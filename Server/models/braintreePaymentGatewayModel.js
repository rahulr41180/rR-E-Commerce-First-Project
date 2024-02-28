
import mongoose from "mongoose";

import moment from "moment-timezone";

const braintreePaymentGatewayOrderSchema = new mongoose.Schema({
    products : [
        {
            product : {
                type : mongoose.ObjectId,
                ref : "product"
            },
            quantity : {
                type : Number,

                required : true
            },
            orderStatus : {
                type : String,
                default : "Not Process",
                enum : ["Not Process", "Processing", "Shipped", "Delivered", "Canceled"]
            },
            modifiedDate : {
                type : Date,

                default : () => moment().tz("Asia/Kolkata").toDate()
            }
        }
    ],
    payment : {},
    buyer : {
        type : mongoose.ObjectId,
        ref : "users"
    },

    totalPrice : {
        type : Number
    }
}, {
    timestamps : {
        currentTime : () => moment().tz("Asia/Kolkata").toDate()
    }

});


export default mongoose.model("braintree-payment-order", braintreePaymentGatewayOrderSchema);