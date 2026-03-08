import { api } from "../../services/api";

export interface ProductionSuggestion {
  productId: number;
  productName: string;
  maxProduction: number;
  unitPrice: number;
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