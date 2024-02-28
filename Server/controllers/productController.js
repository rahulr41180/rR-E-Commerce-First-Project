
import productModel from "../models/productModel.js";

// fs module for managing the image file.
import fs from "fs";
import slugify from "slugify";

// Create Product || METHOD : POST

const createProductController = async (req, res) => {
    try {
        // Before I was getting data from req.body.

        // Here I am using req.fields because we will get the data from form-data.
        // Here, I am getting the data like : name, category etc.. from req.fields.
        // And Here, I am getting the file data like : image, document etc.. from req.files.
        // req.fields is comes under express-formidable module.

        // console.log('req.fields:', req.fields)
        const {name, slug, description, price, category, quantity, shipping } = req.fields;
        const slugifyName = slugify(name);
        // console.log('req.files:', req.files)

        const { photo } = req.files;

        // Validation
        
        switch(true) {
            case !name : return res.status(500).send({message : "Name is require"});
            case !description : return res.status(500).send({message : "Description is require"});
            case !price : return res.status(500).send({message : "Price is require"});
            case !category : return res.status(500).send({message : "Category is require"});
            case !quantity : return res.status(500).send({message : "Quantity is require"});
            case !photo && photo.size < 100000: return res.status(500).send({message : "Photo is require and It should be less than 1 MB"});
            
        }
        
        const product = new productModel({
            // Here I have create copy of data with the help of spread operator.
            ...req.fields, slug:slugifyName.toLowerCase()
        })
        
        if(photo) {
            
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type
        }
        
        // return;
        const result = await product.save();
        
        console.log("Here");
        res.status(201).send({
            status : true,

            message : "Product has been created successfully",
            product : product,
            result : result
        })

    } catch(error) {
        console.log('error:', error.message)
        return res.status(500).send({
            status : false,

            error : error.message,
            message : error.message

        })
    }
}

// Getting All Product

const getProductController = async (req, res) => {
    try {
        const product = await productModel.find({})

        .populate("category")
        .select("-photo")
        .limit(12)
        .sort({createdAt : -1});

        res.status(200).send({
            status : true,
            message : "Successfully getting all the products",
            product_count : product.length,

            product : product,
        })

    } catch(error) {
        return res.status(500).send({
            status : false,
            error : error.message,
            message : "Something went wrong! Please try again.."   
        });
        
    }
}

// Getting Single Product

const getSingleProductController = async (req, res) => {
    try {
        console.log('req.params.pId:', req.params.pId)
        const product = await productModel
        .findOne({_id : req.params.pId})

        .populate("category")
        .select("-photo");

        res.status(200).send({

            status : true,
            message : "Successfully getting single product..",
            product : product
        })


    } catch(error) {
        return res.status(500).send({
            status : false,
            error : error.message,
            message : "Something went wrong! Please try again.." 
        })
    }
}


// Getting Product Photo

const getProductPhotoController = async (req, res) => {
    try {
        const productPhoto = await productModel.findById(req.params.pid)

        .select("photo");
        // console.log('productPhoto:', productPhoto)
        
        if(productPhoto.photo.data) {

            // console.log('productPhoto:', productPhoto.photo.data);
            // console.log(true);
            // console.log('productPhoto.photo.contentType:', productPhoto.photo.contentType)
            res.set("Content-type", productPhoto.photo.contentType);
            // console.log('res.set("Content-type", productPhoto.photo.contentType):', res.set("Content-type", productPhoto.photo.contentType))
            
            return res.status(200).send(
                productPhoto.photo.data
            )
        }

    } catch(error) {
        return res.status(500).send({
            status : false,
            error : error.message,
            message : "Something went wrong! Please try again.." 
        })
    }
}


// Deleting Product

const deleteProductController = async (req, res) => {
    try {
        const product = await productModel.findByIdAndDelete(req.params.pId)
        .select("-photo");

        return res.status(200).send({
            status : true,

            message : "Product has been deleted successfully",
            product : product
        })

    } catch(error) {
        return res.status(500).send({
            status : false,
            error : error.message,
            message : "Something went wrong! Please try again.."

        })
    }
}

// Updating Product

const updateProductController = async (req, res) => {
    try {
        const {name, slug, description, price, category, quantity, shipping, updatePhoto } = req.fields;
        // console.log('updatePhoto:', typeof updatePhoto, updatePhoto)
        // console.log('req.fields:', req.fields);

        const { photo } = updatePhoto === "true" ? req.files : {photo : false};
        // console.log('photo:', photo)

        switch(true) {
            case !name : return res.status(500).send({message : "Name is require"});
            case !description : return res.status(500).send({message : "Description is require"});
            case !price : return res.status(500).send({message : "Price is require"});
            case !category : return res.status(500).send({message : "Category is require"});
            case !quantity : return res.status(500).send({message : "Quantity is require"});
            case !photo && updatePhoto === "true" && photo.size < 100000: return res.status(500).send({message : "Photo is require and It should be less than 1 MB"});
        }

        const product = await productModel.findByIdAndUpdate(req.params.pId, {
            ...req.fields, slug : slugify(name),
        }, {new : true});

        if(photo && updatePhoto === "true") {
            product.photo.data = fs.readFileSync(photo.path);
            
            product.photo.contentType = photo.type
        }

        const result = await product.save();

        return res.status(201).send({
            success : true,
            message : "Product has been updated successfully",
            product : product,

        })

    } catch(error) {

        return res.status(500).send({
            status : false,
            error : error.message,
            message : "Something went wrong! Please try again.."
        })
    }

}


const productFilterController = async (req, res) => {
    try {
        const currentPage = parseInt(req.params.currentPage) || 1;
        const itemPerPage = parseInt(req.params.itemPerPage) || 1;
        const skip = (currentPage - 1) * itemPerPage;

        let {categoriesFilter, priceFilter} = req.body
        // console.log('priceFilter:', priceFilter.length)
        // console.log('categoriesFilter:', categoriesFilter)
        if(priceFilter.length > 0) {
            priceFilter = priceFilter.join(",").split(",").map(Number);
        }

        // console.log('priceFilter:', priceFilter.length)
        let min = Math.min(...priceFilter);
        
        let max = Math.max(...priceFilter);
        let arg = {};
        
        if(categoriesFilter.length > 0) arg.category = categoriesFilter;
        if(priceFilter.length > 0) arg.price = { $gte : min, $lte : max };
        // console.log('arg:', arg)

        const products = await productModel.find(arg).skip(skip)
        .limit(itemPerPage)
        .populate("category")
        .select("-photo")
        res.status(200).send({
            status : true,

            products : products
        })

    } catch(error) {
        return res.status(500).send({
            status : false,
            error : error.message,
            message : "Something went wrong in product filter controller! Please try again.."
        })
    }
}

const productCountController = async (req, res) => {
    try {
        const productCount = await productModel.find({}).estimatedDocumentCount();

        // console.log('productCount:', productCount)

        res.status(200).send({
            status : true,
            totalProduct : productCount
        })

    } catch(error) {
        return res.status(500).send({
            status : false,
            error : error.message,
            message : "Something went wrong! Please try again.."
        })
    }
}

const productPaginationController = async (req, res) => {
    try {
        const currentPage = parseInt(req.params.currentPage) || 1;
        // console.log('currentPage:', currentPage)
        const itemPerPage = parseInt(req.params.itemPerPage) || 2;
        // console.log('itemPerPage:', itemPerPage)
        const skip = (currentPage - 1) * itemPerPage;
        const products = await productModel
        .find()
        
        .skip(skip)
        .limit(itemPerPage)
        .populate("category")
        .select("-photo")
        .sort({ createdAt : -1 });
        res.status(200).send({
            status : true,
            products : products
        })


    } catch(error) {
        return res.status(500).send({
            status : false,
            error : error.message,
            message : "Something went wrong! Please try again.."
        })
    }
}

const searchBaseProductController = async (req, res) => {
    try {
        const { searchTerm } = req.params
        console.log('searchTerm:', searchTerm)
        const products = await productModel.find({ $or : [
            {name : { $regex : searchTerm, $options : "i"}}, 
            {description : { $regex : searchTerm, $options : "i"}}
            
        ]}).select("-photo");

        if(!products) {
            return res.status(200).send({
                status : false,
                message : "Please search again"
            })
        }

        res.status(200).send({
            status : true,
            products : products
        })
    } catch(error) {
        res.status(500).send({

            status : false,
            message : "Something went wrong please try with another search",
            error : error.message
        })

    }
}

const gettingSimilarProductController = async (req, res) => {

    try {
        const { pId, cId } = req.params
        console.log('pId:', pId)
        console.log('cId:', cId)

        const products = await productModel.find({ category : cId, _id : { $ne : pId}})
        .select("-photo")
        .limit(10)
        .populate("category")

        return res.status(200).send({
            status : true,
            products : products
        })
    } catch(error) {
        res.status(500).send({
            status : false,
            message : "Something went wrong please try with another search",
            error : error.message

        })
    }
}

// Getting Products Based On Selected Category

const gettingProductsBasedOnCategory = async (req, res) => {
    try {
        const { cId } = req.params;

        const products = await productModel.find({category : cId})
        .select("-photo")
        .populate("category");

        console.log('products:', products)
        if(products.length < 1) {
            return res.status(200).send({
                status : false,
                message : "No product available for this category please choose another."

            })
        }

        res.status(200).send({
            status : true,
            products : products
        })

    } catch(error) {
        res.status(500).send({

            status : false,
            message : "Something went wrong please try with another search",
            error : error.message
        })
    }
}

export {
    createProductController,
    getProductController,
    getSingleProductController,

    getProductPhotoController,
    deleteProductController,
    updateProductController,
    productFilterController,
    productPaginationController,
    productCountController,
    searchBaseProductController,
    gettingSimilarProductController,
    gettingProductsBasedOnCategory

}