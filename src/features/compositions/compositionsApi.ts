import { api } from "../../services/api";

export interface Composition {
  id: number;
  rawMaterialId: number;
  rawMaterialName: string;
  quantityRequired: number;
}

export const compositionsApi = api.injectEndpoints({
  endpoints: (builder) => ({

    getProductComposition: builder.query<Composition[], number>({
      query: (productId) => `/products/${productId}/composition`,
      providesTags: ["Composition"],
    }),

    addComposition: builder.mutation<
      Composition,
      { productId: number; rawMaterialId: number; quantityRequired: number }
    >({
      query: ({ productId, ...body }) => ({
        url: `/products/${productId}/composition`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Composition"],
    }),

    deleteComposition: builder.mutation<void, number>({
      query: (id) => ({
        url: `/composition/${id}`,
        method: "DELETE",
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