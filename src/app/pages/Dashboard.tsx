import { Package, Boxes, Warehouse, DollarSign } from "lucide-react";
import { StatCard } from "../components/dashboard/StatCard";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const stockDistributionData = [
  { name: "In Stock", value: 450, color: "var(--color-success)" },
  { name: "Low Stock", value: 120, color: "var(--color-warning)" },
  { name: "Out of Stock", value: 30, color: "var(--color-error)" },
];

const productionValueData = [
  { month: "Jan", value: 45000 },
  { month: "Feb", value: 52000 },
  { month: "Mar", value: 48000 },
  { month: "Apr", value: 61000 },
  { month: "May", value: 55000 },
  { month: "Jun", value: 67000 },
];

export function Dashboard() {
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
          value={124}
          icon={Package}
          trend={{ value: "12%", positive: true }}
          color="var(--color-primary)"
        />
        <StatCard
          title="Total Raw Materials"
          value={87}
          icon={Boxes}
          trend={{ value: "5%", positive: true }}
          color="var(--color-info)"
        />
        <StatCard
          title="Total Stock Quantity"
          value="15,340"
          icon={Warehouse}
          trend={{ value: "8%", positive: false }}
          color="var(--color-warning)"
        />
        <StatCard
          title="Est. Production Value"
          value="$245,600"
          icon={DollarSign}
          trend={{ value: "15%", positive: true }}
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
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
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
              <Legend 
                wrapperStyle={{ fontSize: '0.875rem' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
