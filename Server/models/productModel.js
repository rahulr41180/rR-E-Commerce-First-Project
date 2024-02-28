
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    slug : {
        type : String,
        required : true,
    },

    description : {
        type : String,
        required : true,
    },
    price : {
        type : Number,
        required : true,
    },
    category : {

        type : mongoose.ObjectId,
        ref : "Category",
        required : true,
    },
    quantity : {
        type : Number,
        required : true,
    },
    photo : {

        data : Buffer,
        // With the help of type : Buffer we can save the file.
        contentType : String
        // This will ensure that what is the type of file means file is image file or document file.
    },
    shipping : {
        type : Boolean,
    }
}, {

    timestamps : true,
})

export default mongoose.model("product", productSchema);