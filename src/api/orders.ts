import api from "./index";

export interface OrderItem {
  name: string;
  qty: number;
  image: string;
  price: number;
  product: string;
  color?: string;
  size?: string;
}

export interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface OrderData {
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
}

export const createOrder = async (orderData: OrderData) => {
  const response = await api.post("/orders", orderData);
  return response.data;
};

export const getOrderById = async (id: string) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

export const payOrder = async (orderId: string, paymentResult: any) => {
  const response = await api.put(`/orders/${orderId}/pay`, paymentResult);
  return response.data;
};

export const getMyOrders = async () => {
  const response = await api.get("/orders/myorders");
  return response.data;
};

export const trackOrder = async (trackingNumber: string) => {
  const response = await api.get(`/orders/track/${trackingNumber}`);
  return response.data;
};
