import api from "../api/apiClient";

export const getRawMaterials = () => {
  return api.get("/raw-materials");
};

export const createRawMaterial = (data: any) => {
  return api.post("/raw-materials", data);
};

export const updateRawMaterial = (id: number, data: any) => {
  return api.put(`/raw-materials/${id}`, data);
};

export const deleteRawMaterial = (id: number) => {
  return api.delete(`/raw-materials/${id}`);
};