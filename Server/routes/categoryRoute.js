
import express from "express";

const router = express.Router();
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import { createCategoryController, updateCategoryController, getAllCategoriesController, getSingleCategoryController, deleteSingleCategoryController } from "../controllers/categoryController.js";

// Create Category | METHOD : POST
router.post("/create-category", requireSignIn, isAdmin, createCategoryController);

// Update Category | METHOD : PUT
router.put("/update-category/:id", requireSignIn, isAdmin, updateCategoryController);

// Get All Category | METHOD : GET
router.get("/get-all-categories", getAllCategoriesController);

// Get Single Category | METHOD : GET
router.get("/get-single-category/:slug", getSingleCategoryController);

// Delete Single Category | METHOD : DELETE
router.delete("/delete-single-category/:id", requireSignIn, isAdmin, deleteSingleCategoryController);

export default router;