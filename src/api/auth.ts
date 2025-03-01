import api from "./index";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface UserData {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
}

export const login = async (credentials: LoginCredentials) => {
  const response = await api.post("/users/login", credentials);
  return response.data;
};

export const register = async (userData: RegisterData) => {
  const response = await api.post("/users", userData);
  return response.data;
};

export const getUserProfile = async () => {
  const response = await api.get("/users/profile");
  return response.data;
};

export const updateUserProfile = async (userData: Partial<UserData>) => {
  const response = await api.put("/users/profile", userData);
  return response.data;
};

export const addAddress = async (addressData: any) => {
  const response = await api.post("/users/address", addressData);
  return response.data;
};

export const updateAddress = async (addressId: string, addressData: any) => {
  const response = await api.put(`/users/address/${addressId}`, addressData);
  return response.data;
};

export const deleteAddress = async (addressId: string) => {
  const response = await api.delete(`/users/address/${addressId}`);
  return response.data;
};
