import api from "./index";

export const getStripeConfig = async () => {
  const response = await api.get("/payments/stripe/config");
  return response.data;
};

export const processStripePayment = async (paymentData: {
  amount: number;
  currency: string;
  paymentMethodId: string;
  description: string;
}) => {
  const response = await api.post("/payments/stripe", paymentData);
  return response.data;
};

export const processMpesaPayment = async (paymentData: {
  phoneNumber: string;
  amount: number;
  orderId: string;
}) => {
  const response = await api.post("/payments/mpesa", paymentData);
  return response.data;
};
