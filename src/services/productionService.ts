import api from "../api/apiClient";

export const getProductionSuggestions = () => {
  return api.get("/production/suggestions");
};