import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
  color?: string;
}

export function StatCard({ title, value, icon: Icon, trend, color = 'var(--color-primary)' }: StatCardProps) {
  return (
    <div
      style={{
        backgroundColor: 'var(--color-surface)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--spacing-xl)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-lg)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <p
            style={{
              fontSize: 'var(--font-size-secondary)',
              color: 'var(--color-text-secondary)',
              margin: 0,
              marginBottom: 'var(--spacing-sm)',
            }}
          >
            {title}
          </p>
          <h3
            style={{
              fontSize: 'var(--font-size-section-title)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-text-primary)',
              margin: 0,
            }}
          >
            {value}
          </h3>
        </div>
        
        <div
          style={{
            width: '3rem',
            height: '3rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: `${color}15`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: color,
          }}
        >
          <Icon size={24} />
        </div>
      </div>

      {trend && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-sm)',
            fontSize: 'var(--font-size-small)',
            color: trend.positive ? 'var(--color-success)' : 'var(--color-error)',
          }}
        >
          <span>{trend.positive ? '↑' : '↓'} {trend.value}</span>
          <span style={{ color: 'var(--color-text-muted)' }}>vs last month</span>
        </div>
      )}
    </div>
  );
}
