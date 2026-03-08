import { createBrowserRouter } from "react-router";
import { Dashboard } from "./pages/Dashboard";
import { Products } from "./pages/Products";
import { RawMaterials } from "./pages/RawMaterials";
import { ProductComposition } from "./pages/ProductComposition";
import { ProductionSuggestions } from "./pages/ProductionSuggestions";
import { AppLayout } from "./components/layout/AppLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "products", Component: Products },
      { path: "raw-materials", Component: RawMaterials },
      { path: "product-composition/:productId", Component: ProductComposition },
      { path: "production-suggestions", Component: ProductionSuggestions },
    ],
  },
]);
