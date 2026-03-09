import { api } from "../../services/api";

interface ProductionSuggestion {
  productId: number;
  productName: string;
  requiredQuantity: number;
  unitPrice: number;
  totalProductionValue: number;
}

export const productionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProductionSuggestions: builder.query<ProductionSuggestion[], void>({
      query: () => "/production/suggestions",
      providesTags: ["Production"],
    }),
  }),
});

export const { useGetProductionSuggestionsQuery } = productionApi;