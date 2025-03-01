import api from "./index";

export interface ProductFilter {
  keyword?: string;
  category?: string;
  brand?: string;
  priceMin?: number;
  priceMax?: number;
  inStock?: boolean;
  pageNumber?: number;
  featured?: boolean;
  new?: boolean;
}

export const getProducts = async (filters: ProductFilter = {}) => {
  const response = await api.get("/products", { params: filters });
  return response.data;
};

export const getProductById = async (id: string) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const getTopProducts = async (limit = 5) => {
  const response = await api.get(`/products/top?limit=${limit}`);
  return response.data;
};

export const getFeaturedProducts = async (limit = 8) => {
  const response = await api.get(`/products/featured?limit=${limit}`);
  return response.data;
};

export const getNewProducts = async (limit = 8) => {
  const response = await api.get(`/products/new?limit=${limit}`);
  return response.data;
};

export const getProductCategories = async () => {
  const response = await api.get("/products/categories");
  return response.data;
};

export const getProductBrands = async () => {
  const response = await api.get("/products/brands");
  return response.data;
};

export const createProductReview = async (
  productId: string,
  review: { rating: number; comment: string },
) => {
  const response = await api.post(`/products/${productId}/reviews`, review);
  return response.data;
};
