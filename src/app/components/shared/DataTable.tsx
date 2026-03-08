interface Column {
  key: string;
  label: string;
  width?: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
}

export function DataTable({ columns, data }: DataTableProps) {
  return (
    <div
      style={{
        backgroundColor: 'var(--color-surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden',
      }}
    >
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr
              style={{
                backgroundColor: 'var(--color-surface-secondary)',
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              {columns.map((column) => (
                <th
                  key={column.key}
                  style={{
                    padding: 'var(--spacing-lg)',
                    textAlign: 'left',
                    fontSize: 'var(--font-size-small)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-text-secondary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    width: column.width,
                  }}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: index < data.length - 1 ? '1px solid var(--color-border)' : 'none',
                    transition: 'var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-surface-secondary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      style={{
                        padding: 'var(--spacing-lg)',
                        fontSize: 'var(--font-size-secondary)',
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      {column.render
                        ? column.render(row[column.key], row)
                        : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  style={{
                    padding: 'var(--spacing-3xl)',
                    textAlign: 'center',
                    fontSize: 'var(--font-size-secondary)',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
