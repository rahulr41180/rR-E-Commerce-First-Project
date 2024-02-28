
import express from "express";

const router = express.Router();

import { 
    braintreePaymentClientTokenGenerateController,
    braintreePaymentReceiveFromClientController
} from "../controllers/braintreePaymentGatewayController.js";

import { requireSignIn, isAdmin, isUser } from "../middlewares/authMiddleware.js";


// Generate a client token and send a client token to out client.
router.get("/client-token-generate", requireSignIn, braintreePaymentClientTokenGenerateController);


// Receive a payment from our client
router.post("/receive-payment", requireSignIn, braintreePaymentReceiveFromClientController);

export default router