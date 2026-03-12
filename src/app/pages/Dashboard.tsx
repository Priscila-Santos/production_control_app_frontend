import { Package, Boxes, Warehouse, DollarSign } from "lucide-react";
import { StatCard } from "../components/dashboard/StatCard";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

import { useGetDashboardQuery } from "../../features/dashboard/dashboardApi";

export function Dashboard() {

  const { data, isLoading, isError } = useGetDashboardQuery();

  if (isLoading) {
    return <p>Loading dashboard...</p>;
  }

  if (isError || !data) {
    return <p>Error loading dashboard data</p>;
  }

  const stockDistributionData = data.stockDistribution.map((item) => ({
    ...item,
    color:
      item.name === "In Stock"
        ? "var(--color-success)"
        : item.name === "Low Stock"
        ? "var(--color-warning)"
        : "var(--color-error)"
  }));

  const productionValueData = data.productionValueTrend;

  return (
    <div>

      {/* Page Header */}
      <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
        <h1 className="page-title">Dashboard</h1>
        <p
          style={{
            fontSize: 'var(--font-size-secondary)',
            color: 'var(--color-text-secondary)',
            marginTop: 'var(--spacing-sm)',
          }}
        >
          Overview of your production and inventory system
        </p>
      </div>

      {/* Stat Cards */}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))',
          gap: 'var(--spacing-xl)',
          marginBottom: 'var(--spacing-2xl)',
        }}
      >

        <StatCard
          title="Total Products"
          value={data.totalProducts}
          icon={Package}
          trend={data.totalProductsTrend}
          color="var(--color-primary)"
        />

        <StatCard
          title="Total Raw Materials"
          value={data.totalRawMaterials}
          icon={Boxes}
          trend={data.totalRawMaterialsTrend}
          color="var(--color-info)"
        />

        <StatCard
          title="Total Stock Quantity"
          value={data.totalStockQuantity.toLocaleString()}
          icon={Warehouse}
          trend={data.totalStockTrend}
          color="var(--color-warning)"
        />

        <StatCard
          title="Est. Production Value"
          value={`$${data.estimatedProductionValue.toLocaleString()}`}
          icon={DollarSign}
          trend={data.productionValueTrendPercent}
          color="var(--color-success)"
        />

      </div>

      {/* Charts */}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(25rem, 1fr))',
          gap: 'var(--spacing-xl)',
        }}
      >

        {/* Production Value Chart */}

        <div
          style={{
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--spacing-xl)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >

          <h3 className="card-title" style={{ marginBottom: 'var(--spacing-xl)' }}>
            Production Value Trend
          </h3>

          <ResponsiveContainer width="100%" height={300}>

            <BarChart data={productionValueData}>

              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />

              <XAxis
                dataKey="month"
                tick={{ fill: 'var(--color-text-secondary)', fontSize: '0.75rem' }}
              />

              <YAxis
                tick={{ fill: 'var(--color-text-secondary)', fontSize: '0.75rem' }}
              />

              <Tooltip
                formatter={(value: number) => `$${value.toLocaleString()}`}
                contentStyle={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                }}
              />

              <Bar dataKey="value" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />

            </BarChart>

          </ResponsiveContainer>

        </div>

        {/* Stock Distribution Chart */}

        <div
          style={{
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--spacing-xl)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >

          <h3 className="card-title" style={{ marginBottom: 'var(--spacing-xl)' }}>
            Stock Distribution
          </h3>

          <ResponsiveContainer width="100%" height={300}>

            <PieChart>

              <Pie
                data={stockDistributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                dataKey="value"
              >

                {stockDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}

              </Pie>

              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                }}
              />

              <Legend wrapperStyle={{ fontSize: '0.875rem' }} />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}
