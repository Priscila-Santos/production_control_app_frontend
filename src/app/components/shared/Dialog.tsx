import { X } from "lucide-react";
import { useEffect } from "react";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Dialog({ isOpen, onClose, title, children }: DialogProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: 'var(--spacing-xl)',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'var(--color-surface)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          width: '100%',
          maxWidth: '32rem',
          maxHeight: '90vh',
          overflow: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dialog Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 'var(--spacing-xl)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <h2
            className="card-title"
            style={{ margin: 0 }}
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            style={{
              padding: 'var(--spacing-sm)',
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
            <X size={20} />
          </button>
        </div>

        {/* Dialog Content */}
        <div style={{ padding: 'var(--spacing-xl)' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
