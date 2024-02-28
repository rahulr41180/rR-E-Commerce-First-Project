
import express from "express";

// router object
const router = express.Router();

import { 
registerController, 
loginController, 
testController, 
userAuthProtectedController, 
forgotPasswordController, 

forgotSecretKeyController,
adminAuthProtectedController,
updateProfileController
} from "../controllers/authController.js";

import { requireSignIn, isAdmin, isUser } from "../middlewares/authMiddleware.js";

// routing 
// Register || Method : POST
router.post("/register", registerController);

// Login || Method : POST
router.post("/login", loginController);

// Forgot Password || Method : POST
router.post("/forgot-password", forgotPasswordController);

// Forgot Secret Key || Method : POST
router.post("/forgot-secret-key", forgotSecretKeyController);

// Test || Method : GET
router.get("/test", requireSignIn, isAdmin, testController);

// Protected Route For User Authentication || Method : GET
router.get("/user-auth", requireSignIn, isUser, userAuthProtectedController)

// Protected Route For Admin Authentication || Method : GET
router.get("/admin-auth", requireSignIn, isAdmin, adminAuthProtectedController)

// Update User || METHOD : PUT

router.put("/update-profile", requireSignIn, updateProfileController);

export default router;