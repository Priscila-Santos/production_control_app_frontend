import { NavLink } from "react-router";
import { 
  LayoutDashboard, 
  Package, 
  Boxes, 
  FileText, 
  TrendingUp,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Products", href: "/products", icon: Package },
  { name: "Raw Materials", href: "/raw-materials", icon: Boxes },
  { name: "Production Suggestions", href: "/production-suggestions", icon: TrendingUp },
];

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <aside
      style={{
        width: collapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
        backgroundColor: 'var(--color-surface)',
        borderRight: '1px solid var(--color-border)',
        transition: 'var(--transition-normal)',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
      }}
    >
      {/* Logo Section */}
      <div
        style={{
          height: 'var(--header-height)',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          padding: collapsed ? 'var(--spacing-lg)' : 'var(--spacing-xl)',
        }}
      >
        {!collapsed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
            <div
              style={{
                width: '2rem',
                height: '2rem',
                backgroundColor: 'var(--color-primary)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'var(--font-weight-bold)',
                fontSize: 'var(--font-size-card-title)'
              }}
            >
              P
            </div>
            <span
              style={{
                fontSize: 'var(--font-size-card-title)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-text-primary)',
              }}
            >
              ProControl
            </span>
          </div>
        )}
        
        <button
          onClick={onToggle}
          style={{
            padding: 'var(--spacing-sm)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-surface)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-text-secondary)',
            transition: 'var(--transition-fast)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-surface-secondary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-surface)';
          }}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Navigation */}
      <nav
        style={{
          flex: 1,
          padding: 'var(--spacing-lg)',
          overflowY: 'auto',
        }}
      >
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
          {navigation.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.href}
                end={item.href === "/"}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-md)',
                  padding: 'var(--spacing-md)',
                  borderRadius: 'var(--radius-md)',
                  textDecoration: 'none',
                  fontSize: 'var(--font-size-secondary)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                  backgroundColor: isActive ? 'var(--color-primary-soft)' : 'transparent',
                  transition: 'var(--transition-fast)',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                })}
                onMouseEnter={(e) => {
                  if (!e.currentTarget.getAttribute('aria-current')) {
                    e.currentTarget.style.backgroundColor = 'var(--color-surface-secondary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!e.currentTarget.getAttribute('aria-current')) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <item.icon size={20} />
                {!collapsed && <span>{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
