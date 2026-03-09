import { useState } from "react";
import { RefreshCw, Package, DollarSign } from "lucide-react";
import { DataTable } from "../components/shared/DataTable";

import { useGetProductionSuggestionsQuery } from "../../features/production/productionApi";

interface ProductionSuggestion {
  productId: number;
  productName: string;
  maxProduction: number;
  unitPrice: number;
}

export function ProductionSuggestions() {

  const { data = [], isLoading, refetch } = useGetProductionSuggestionsQuery(undefined);

  const [isRefreshing, setIsRefreshing] = useState(false);

  if (isLoading) return <p>Loading...</p>;

  const suggestions = data.map((item: ProductionSuggestion) => {

    const maxProduction = Number(item.maxProduction) || 0;
    const unitPrice = Number(item.unitPrice) || 0;

    return {
      id: item.productId,
      productName: item.productName,
      requiredQuantity: maxProduction,
      unitPrice: unitPrice,
      totalValue: maxProduction * unitPrice,
    };

  });

  const totalSuggestedProducts = suggestions.length;

  const totalEstimatedValue = suggestions.reduce(
    (sum, s) => sum + s.totalValue,
    0
  );

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  const columns = [
    { key: "productName", label: "Product Name", width: "30%" },
    { key: "requiredQuantity", label: "Required Quantity", width: "20%" },
    {
      key: "unitPrice",
      label: "Unit Price",
      width: "20%",
      render: (value: number) => `$${value.toFixed(2)}`,
    },
    {
      key: "totalValue",
      label: "Total Production Value",
      width: "30%",
      render: (value: number) => (
        <span
          style={{
            fontWeight: "var(--font-weight-semibold)",
            color: "var(--color-success)",
          }}
        >
          ${value.toFixed(2)}
        </span>
      ),
    },
  ];

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "var(--spacing-2xl)",
        }}
      >
        <div>
          <h1 className="page-title">Production Suggestions</h1>

          <p
            style={{
              fontSize: "var(--font-size-secondary)",
              color: "var(--color-text-secondary)",
              marginTop: "var(--spacing-sm)",
            }}
          >
            Recommended production based on current stock availability
          </p>
        </div>

        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--spacing-sm)",
            padding: "var(--spacing-md) var(--spacing-xl)",
            backgroundColor: "var(--color-primary)",
            color: "white",
            border: "none",
            borderRadius: "var(--radius-md)",
            fontSize: "var(--font-size-secondary)",
            fontWeight: "var(--font-weight-medium)",
            cursor: isRefreshing ? "not-allowed" : "pointer",
            opacity: isRefreshing ? 0.6 : 1,
          }}
        >
          <RefreshCw
            size={18}
            style={{
              animation: isRefreshing ? "spin 1s linear infinite" : "none",
            }}
          />
          Refresh
        </button>
      </div>

      {/* Summary Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))",
          gap: "var(--spacing-xl)",
          marginBottom: "var(--spacing-2xl)",
        }}
      >
        <div
          style={{
            backgroundColor: "var(--color-surface)",
            borderRadius: "var(--radius-lg)",
            padding: "var(--spacing-xl)",
            border: "1px solid var(--color-border)",
            boxShadow: "var(--shadow-sm)",
            display: "flex",
            alignItems: "center",
            gap: "var(--spacing-xl)",
          }}
        >
          <div
            style={{
              width: "3rem",
              height: "3rem",
              borderRadius: "var(--radius-md)",
              backgroundColor: "var(--color-info-soft)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--color-info)",
            }}
          >
            <Package size={24} />
          </div>

          <div>
            <p
              style={{
                fontSize: "var(--font-size-secondary)",
                color: "var(--color-text-secondary)",
                margin: 0,
              }}
            >
              Total Suggested Products
            </p>

            <h3
              style={{
                fontSize: "var(--font-size-section-title)",
                fontWeight: "var(--font-weight-bold)",
                margin: 0,
                marginTop: "var(--spacing-xs)",
              }}
            >
              {totalSuggestedProducts}
            </h3>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "var(--color-surface)",
            borderRadius: "var(--radius-lg)",
            padding: "var(--spacing-xl)",
            border: "1px solid var(--color-border)",
            boxShadow: "var(--shadow-sm)",
            display: "flex",
            alignItems: "center",
            gap: "var(--spacing-xl)",
          }}
        >
          <div
            style={{
              width: "3rem",
              height: "3rem",
              borderRadius: "var(--radius-md)",
              backgroundColor: "var(--color-success-soft)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--color-success)",
            }}
          >
            <DollarSign size={24} />
          </div>

          <div>
            <p
              style={{
                fontSize: "var(--font-size-secondary)",
                color: "var(--color-text-secondary)",
                margin: 0,
              }}
            >
              Total Estimated Production Value
            </p>

            <h3
              style={{
                fontSize: "var(--font-size-section-title)",
                fontWeight: "var(--font-weight-bold)",
                color: "var(--color-success)",
                margin: 0,
                marginTop: "var(--spacing-xs)",
              }}
            >
              ${totalEstimatedValue.toFixed(2)}
            </h3>
          </div>
        </div>
      </div>

      {/* Table */}
      <DataTable columns={columns} data={suggestions} />

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
