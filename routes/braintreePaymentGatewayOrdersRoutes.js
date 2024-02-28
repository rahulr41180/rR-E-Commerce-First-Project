
import express from "express";

const router = express.Router();
import { 
    gettingAllOrderController,
    gettingAllUsersOrderController,
    updatingOrderedProductStatusController
} from "../controllers/braintreePaymentGatewayOrdersController.js";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";



// Getting All Respective Order Of User
router.get("/getting-user-orders", requireSignIn, gettingAllOrderController);

// Getting All Users Orders For Admin
router.get("/getting-all-users-orders", requireSignIn, isAdmin,  gettingAllUsersOrderController);

// Updating The Perticular Ordered Product Status
router.put("/updating-ordered-product-status/:oId/:pId", requireSignIn, isAdmin, updatingOrderedProductStatusController);


export default router;