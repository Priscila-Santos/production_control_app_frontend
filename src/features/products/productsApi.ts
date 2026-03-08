import { api } from "../../services/api";

export interface Product {
  id: number;
  name: string;
  price: number;
}

export const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({

    getProducts: builder.query<Product[], void>({
      query: () => "/products",
      providesTags: ["Products"],
    }),

    getProduct: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
    }),

    createProduct: builder.mutation<Product, Partial<Product>>({
      query: (product) => ({
        url: "/products",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Products"],
    }),

    updateProduct: builder.mutation<Product, { id: number } & Partial<Product>>({
      query: ({ id, ...product }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ["Products"],
    }),

    deleteProduct: builder.mutation<void, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),

  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;