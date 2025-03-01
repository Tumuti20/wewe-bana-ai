import express from "express";
import {
  processStripePayment,
  processMpesaPayment,
  mpesaCallback,
  getStripeConfig,
} from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/stripe").post(protect, processStripePayment);
router.route("/stripe/config").get(getStripeConfig);
router.route("/mpesa").post(protect, processMpesaPayment);
router.route("/mpesa/callback").post(mpesaCallback);

export default router;
