import { api } from "../../services/api";

export interface RawMaterial {
  id: number;
  name: string;
  stockQuantity: number;
}

export const rawMaterialsApi = api.injectEndpoints({
  endpoints: (builder) => ({

    getRawMaterials: builder.query<RawMaterial[], void>({
      query: () => "/raw-materials",
      providesTags: ["RawMaterials"],
    }),

    createRawMaterial: builder.mutation<RawMaterial, Partial<RawMaterial>>({
      query: (body) => ({
        url: "/raw-materials",
        method: "POST",
        body,
      }),
      invalidatesTags: ["RawMaterials"],
    }),

    updateRawMaterial: builder.mutation<
      RawMaterial,
      { id: number } & Partial<RawMaterial>
    >({
      query: ({ id, ...body }) => ({
        url: `/raw-materials/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["RawMaterials"],
    }),

    deleteRawMaterial: builder.mutation<void, number>({
      query: (id) => ({
        url: `/raw-materials/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["RawMaterials"],
    }),

  }),
});

export const {
  useGetRawMaterialsQuery,
  useCreateRawMaterialMutation,
  useUpdateRawMaterialMutation,
  useDeleteRawMaterialMutation,
} = rawMaterialsApi;