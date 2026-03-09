import { api } from "../../services/api";

export interface Composition {
  productId: number;
  rawMaterialId: number;
  rawMaterialName: string;
  requiredQuantity: number;
}

export const compositionsApi = api.injectEndpoints({
  endpoints: (builder) => ({

    getProductComposition: builder.query<Composition[], number>({
      query: (productId) => `/product-materials/product/${productId}`,
      providesTags: ["Composition"],
    }),

    addComposition: builder.mutation<
      Composition,
      { productId: number; rawMaterialId: number; requiredQuantity: number }
    >({
      query: (body) => ({
        url: `/product-materials`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Composition"],
    }),

    deleteComposition: builder.mutation<
      void,
      { productId: number; rawMaterialId: number }
    >({
      query: ({ productId, rawMaterialId }) => ({
        url: `/product-materials`,
        method: "DELETE",
        params: { productId, rawMaterialId },
      }),
      invalidatesTags: ["Composition"],
    }),

  }),
});

export const {
  useGetProductCompositionQuery,
  useAddCompositionMutation,
  useDeleteCompositionMutation,
} = compositionsApi;