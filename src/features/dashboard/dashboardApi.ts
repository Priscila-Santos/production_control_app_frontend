import { api } from "../../services/api";

interface Trend {
  value: string;
  positive: boolean;
}

interface StockDistribution {
  name: string;
  value: number;
}

interface ProductionTrend {
  month: string;
  value: number;
}

export interface DashboardData {
  totalProducts: number;
  totalRawMaterials: number;
  totalStockQuantity: number;
  estimatedProductionValue: number;

  totalProductsTrend: Trend;
  totalRawMaterialsTrend: Trend;
  totalStockTrend: Trend;
  productionValueTrendPercent: Trend;

  stockDistribution: StockDistribution[];
  productionValueTrend: ProductionTrend[];
}

export const dashboardApi = api.injectEndpoints({
  endpoints: (builder) => ({

    getDashboard: builder.query<DashboardData, void>({
      query: () => "/dashboard",
      providesTags: ["Production", "Products", "RawMaterials"],
    }),

  }),
});

export const { useGetDashboardQuery } = dashboardApi;