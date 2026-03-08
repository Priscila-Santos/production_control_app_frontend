import { useState } from "react";

interface ProductFormProps {
  initialData?: { name: string; price: number };
  onSubmit: (data: { name: string; price: number }) => void;
  onCancel: () => void;
}

export function ProductForm({ initialData, onSubmit, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    price: initialData?.price || 0,
  });

  const [errors, setErrors] = useState<{ name?: string; price?: string }>({});

  const validate = () => {
    const newErrors: { name?: string; price?: string } = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }
    
    if (formData.price <= 0) {
      newErrors.price = "Price must be greater than 0";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
        {/* Product Name */}
        <div>
          <label
            htmlFor="name"
            style={{
              display: 'block',
              fontSize: 'var(--font-size-secondary)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--spacing-sm)',
            }}
          >
            Product Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={{
              width: '100%',
              padding: 'var(--spacing-md)',
              fontSize: 'var(--font-size-secondary)',
              color: 'var(--color-text-primary)',
              backgroundColor: 'var(--color-surface)',
              border: `1px solid ${errors.name ? 'var(--color-error)' : 'var(--color-border)'}`,
              borderRadius: 'var(--radius-md)',
              outline: 'none',
              transition: 'var(--transition-fast)',
            }}
            onFocus={(e) => {
              if (!errors.name) {
                e.target.style.borderColor = 'var(--color-primary)';
              }
            }}
            onBlur={(e) => {
              if (!errors.name) {
                e.target.style.borderColor = 'var(--color-border)';
              }
            }}
          />
          {errors.name && (
            <p
              style={{
                fontSize: 'var(--font-size-small)',
                color: 'var(--color-error)',
                marginTop: 'var(--spacing-xs)',
              }}
            >
              {errors.name}
            </p>
          )}
        </div>

        {/* Price */}
        <div>
          <label
            htmlFor="price"
            style={{
              display: 'block',
              fontSize: 'var(--font-size-secondary)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--spacing-sm)',
            }}
          >
            Price ($)
          </label>
          <input
            type="number"
            id="price"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
            style={{
              width: '100%',
              padding: 'var(--spacing-md)',
              fontSize: 'var(--font-size-secondary)',
              color: 'var(--color-text-primary)',
              backgroundColor: 'var(--color-surface)',
              border: `1px solid ${errors.price ? 'var(--color-error)' : 'var(--color-border)'}`,
              borderRadius: 'var(--radius-md)',
              outline: 'none',
              transition: 'var(--transition-fast)',
            }}
            onFocus={(e) => {
              if (!errors.price) {
                e.target.style.borderColor = 'var(--color-primary)';
              }
            }}
            onBlur={(e) => {
              if (!errors.price) {
                e.target.style.borderColor = 'var(--color-border)';
              }
            }}
          />
          {errors.price && (
            <p
              style={{
                fontSize: 'var(--font-size-small)',
                color: 'var(--color-error)',
                marginTop: 'var(--spacing-xs)',
              }}
            >
              {errors.price}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: 'var(--spacing-md) var(--spacing-xl)',
              fontSize: 'var(--font-size-secondary)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--color-text-secondary)',
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              transition: 'var(--transition-fast)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-surface-secondary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-surface)';
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              padding: 'var(--spacing-md) var(--spacing-xl)',
              fontSize: 'var(--font-size-secondary)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'white',
              backgroundColor: 'var(--color-primary)',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              transition: 'var(--transition-fast)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-primary)';
            }}
          >
            {initialData ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </form>
  );
}
