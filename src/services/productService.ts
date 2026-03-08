import api from "../api/apiClient";

export const getProducts = () => {
  return api.get("/products");
};

export const getProduct = (id: number) => {
  return api.get(`/products/${id}`);
};

export const createProduct = (data: any) => {
  return api.post("/products", data);
};

export const updateProduct = (id: number, data: any) => {
  return api.put(`/products/${id}`, data);
};

export const deleteProduct = (id: number) => {
  return api.delete(`/products/${id}`);
};