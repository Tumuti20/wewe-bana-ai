import asyncHandler from "express-async-handler";
import Stripe from "stripe";
import dotenv from "dotenv";
import Order from "../models/orderModel.js";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// @desc    Process Stripe payment
// @route   POST /api/payments/stripe
// @access  Private
export const processStripePayment = asyncHandler(async (req, res) => {
  const { amount, currency, paymentMethodId, description } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects amount in cents
      currency: currency || "usd",
      payment_method: paymentMethodId,
      description,
      confirm: true,
      return_url: "https://your-website.com/order/confirmation",
    });

    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntent,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// @desc    Process M-Pesa payment
// @route   POST /api/payments/mpesa
// @access  Private
export const processMpesaPayment = asyncHandler(async (req, res) => {
  const { phoneNumber, amount, orderId } = req.body;

  // This is a placeholder for M-Pesa integration
  // In a real implementation, you would integrate with the M-Pesa API
  // For now, we'll simulate a successful payment

  try {
    // Simulate M-Pesa API call
    const mpesaResponse = {
      MerchantRequestID: "M" + Date.now(),
      CheckoutRequestID: "C" + Date.now(),
      ResponseCode: "0",
      ResponseDescription: "Success. Request accepted for processing",
      CustomerMessage: "Success. Request accepted for processing",
    };

    // In a real implementation, you would save the M-Pesa response
    // and wait for a callback from M-Pesa to confirm the payment

    res.json({
      success: true,
      message: "M-Pesa payment initiated",
      data: mpesaResponse,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// @desc    Verify M-Pesa payment (callback from M-Pesa)
// @route   POST /api/payments/mpesa/callback
// @access  Public
export const mpesaCallback = asyncHandler(async (req, res) => {
  // This is a placeholder for M-Pesa callback handling
  // In a real implementation, M-Pesa would send a callback to this endpoint
  // to confirm the payment status

  const { Body } = req.body;

  try {
    if (Body.stkCallback.ResultCode === 0) {
      // Payment successful
      // Update the order status
      const orderId = Body.stkCallback.MerchantRequestID;
      const order = await Order.findById(orderId);

      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          id: Body.stkCallback.CheckoutRequestID,
          status: "COMPLETED",
          update_time: new Date().toISOString(),
        };

        await order.save();
      }

      res.json({ success: true });
    } else {
      // Payment failed
      res.json({
        success: false,
        message: Body.stkCallback.ResultDesc,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// @desc    Get Stripe payment config
// @route   GET /api/payments/stripe/config
// @access  Public
export const getStripeConfig = asyncHandler(async (req, res) => {
  res.json({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});
