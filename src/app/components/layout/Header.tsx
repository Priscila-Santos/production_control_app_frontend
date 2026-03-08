import { Search, Bell, User } from "lucide-react";

export function Header() {
  return (
    <header
      style={{
        height: 'var(--header-height)',
        backgroundColor: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 var(--spacing-xl)',
      }}
    >
      {/* Search Bar */}
      <div style={{ flex: '1', maxWidth: '30rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-md)',
            padding: 'var(--spacing-md) var(--spacing-lg)',
            backgroundColor: 'var(--color-surface-secondary)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
          }}
        >
          <Search size={18} style={{ color: 'var(--color-text-muted)' }} />
          <input
            type="text"
            placeholder="Search..."
            style={{
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent',
              fontSize: 'var(--font-size-secondary)',
              color: 'var(--color-text-primary)',
              width: '100%',
            }}
          />
        </div>
      </div>

      {/* Right Section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-lg)' }}>
        {/* Notifications */}
        <button
          style={{
            position: 'relative',
            padding: 'var(--spacing-md)',
            borderRadius: 'var(--radius-md)',
            border: 'none',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            color: 'var(--color-text-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-surface-secondary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <Bell size={20} />
          <span
            style={{
              position: 'absolute',
              top: 'var(--spacing-sm)',
              right: 'var(--spacing-sm)',
              width: '0.5rem',
              height: '0.5rem',
              backgroundColor: 'var(--color-error)',
              borderRadius: '50%',
              border: '2px solid var(--color-surface)',
            }}
          />
        </button>

        {/* User Menu */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-md)',
            padding: 'var(--spacing-sm)',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-surface-secondary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <div
            style={{
              width: '2rem',
              height: '2rem',
              backgroundColor: 'var(--color-primary)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
            }}
          >
            <User size={18} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontSize: 'var(--font-size-secondary)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--color-text-primary)',
              }}
            >
              Admin User
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
