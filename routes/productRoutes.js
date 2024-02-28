
import express from "express";

const router = express.Router();
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import { 
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
} from "../controllers/productController.js";

// formidable is use for managing image file.

import formidable from "express-formidable";

// Create Product || METHOD : POST
router.post("/create-product", requireSignIn, isAdmin, formidable(), createProductController);

// Getting Product || METHOD : GET
router.get("/get-product", getProductController);

// Getting Single Product || METHOD : GET

router.get("/get-single-product/:pId", getSingleProductController);

// Getting Product Photo || METHOD : GET
router.get("/get-product-photo/:pid", getProductPhotoController);

// Deleting Product || METHOD : DELETE
router.delete("/delete-product/:pId", requireSignIn, isAdmin,  deleteProductController);

// Updating Product || METHOD : PUT

router.put("/update-product/:pId", requireSignIn, isAdmin, formidable(), updateProductController);

// Filter Product || METHOD : POST
router.post("/products-filter/:currentPage/:itemPerPage", productFilterController);


// Paginatin Product || METHOD : POST
router.get("/product-pagination/:currentPage/:itemPerPage", productPaginationController);


// Product Count || METHOD : GET
router.get("/product-count", productCountController);

// Search Base Product Filter || METHOD : POST
router.get("/search-base-product/:searchTerm", searchBaseProductController);

// Getting Similar Product || METHOD : GET
router.get("/get-similar-product/:pId/:cId", gettingSimilarProductController);


// Getting Products Based On Selected Category || METHOD : GET
router.get("/get-products-based-on-category/:cId", gettingProductsBasedOnCategory);

export default router;