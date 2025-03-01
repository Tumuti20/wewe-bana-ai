import api from "./index";

export const getWishlist = async () => {
  const response = await api.get("/users/wishlist");
  return response.data;
};

export const addToWishlist = async (productId: string) => {
  const response = await api.post("/users/wishlist", { productId });
  return response.data;
};

export const removeFromWishlist = async (productId: string) => {
  const response = await api.delete(`/users/wishlist/${productId}`);
  return response.data;
};
