
import categoryModel from "../models/categoryModel.js";

import slugify from "slugify";

// Create Category
const createCategoryController = async (req,res) => {
    try {
        const { name } = req.body;
        // console.log(name.toLowerCase());
        const slugifyName = slugify(name);
        if(!name) {
            return res.status(401).send({
                status : false,
                message : "Please enter the category name"
            })
        }

        const existingCategory = await categoryModel.findOne({ $or : [{name : name}, {slug : slugifyName}]});
        if(existingCategory) {
            return res.status(201).send({
                status : false,
                message : "Category already exists, Please create another category",
            })
        }

        const category = await new categoryModel({
            name : name,
            slug : slugify(name)
        }).save();
        
        return res.status(201).send({
            status : true,
            message : "New category has been created successfully, Thank You",
            category : category
        })

    } catch(error) {
        console.log("Error in createCategoryController :", error.message);
        return res.status(500).send({
            success : false,
            error : error.message,
            message : "Something went wrong in new category creation.."
        })
    }

}


// Update Category
const updateCategoryController = async (req,res) => {
    try {

        const { name } = req.body;
        const { id } = req.params
        // const category = await categoryModel.findOne({name : name});

        const updateCategory = await categoryModel.findByIdAndUpdate({_id : id }, { name : name, slug : slugify(name)}, {new : true});

        return res.status(200).send({
            status : true,
            message : "Category Updated",

            updateCategory : updateCategory
        })

    } catch(error) {
        console.log("Error in updateCategoryController :", error.message);
        return res.status(500).send({
            success : false,
            error : error.message,
            message : "Something went wrong in category updation"
        })
    }
}

// Get All The Categories
const getAllCategoriesController = async (req,res) => {
    try {
        const allCategories = await categoryModel.find({});
        return res.status(200).send({
            status : true,

            message : "Successfully getting all the categories",
            allCategories : allCategories
        })
    } catch(error) {
        console.log("Error in get all category controller :", error.message);
        return res.status(500).send({
            status : false,
            message : "Something went wrong! in getting all the categories",
        })
    }
}

const getSingleCategoryController = async (req,res) => {
    try {
        const { slug } = req.params;
        const singleCategory = await categoryModel.findOne({slug : slug });
        return res.status(200).send({
            status : true,
            message : "Successfully getting the single category",

            singleCategory : singleCategory
        })
    } catch(error) {
        console.log("Error in get single category controller :", error.message);
        return res.status(500).send({
            status : false,
            message : "Something went wrong! in getting the single category",
        })
    }
}

const deleteSingleCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteCategory = await categoryModel.deleteOne({ _id : id });
        return res.status(200).send({
            status : true,
            message : "Category delete successfully"
        })

    } catch(error) {
        console.log("Error in deleting single category controller :", error.message);
        return res.status(500).send({
            status : false,
            message : "Something went wrong! in deleting the single category",
        })
    }
}

export {
    createCategoryController,
    updateCategoryController,
    getAllCategoriesController,
    getSingleCategoryController,
    deleteSingleCategoryController
}