import { useState } from "react";

interface CompositionFormProps {
  availableMaterials: { id: number; name: string }[];
  onSubmit: (data: { rawMaterialId: number; requiredQuantity: number }) => void;
  onCancel: () => void;
}

export function CompositionForm({ availableMaterials, onSubmit, onCancel }: CompositionFormProps) {
  const [formData, setFormData] = useState({
    rawMaterialId: availableMaterials[0]?.id || 0,
    requiredQuantity: 0,
  });

  const [errors, setErrors] = useState<{ rawMaterialId?: string; requiredQuantity?: string }>({});

  const validate = () => {
    const newErrors: { rawMaterialId?: string; requiredQuantity?: string } = {};
    
    if (!formData.rawMaterialId) {
      newErrors.rawMaterialId = "Please select a raw material";
    }
    
    if (formData.requiredQuantity <= 0) {
      newErrors.requiredQuantity = "Quantity must be greater than 0";
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
        {/* Raw Material Selection */}
        <div>
          <label
            htmlFor="rawMaterialId"
            style={{
              display: 'block',
              fontSize: 'var(--font-size-secondary)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--spacing-sm)',
            }}
          >
            Raw Material
          </label>
          <select
            id="rawMaterialId"
            value={formData.rawMaterialId}
            onChange={(e) => setFormData({ ...formData, rawMaterialId: parseInt(e.target.value) })}
            style={{
              width: '100%',
              padding: 'var(--spacing-md)',
              fontSize: 'var(--font-size-secondary)',
              color: 'var(--color-text-primary)',
              backgroundColor: 'var(--color-surface)',
              border: `1px solid ${errors.rawMaterialId ? 'var(--color-error)' : 'var(--color-border)'}`,
              borderRadius: 'var(--radius-md)',
              outline: 'none',
              transition: 'var(--transition-fast)',
              cursor: 'pointer',
            }}
            onFocus={(e) => {
              if (!errors.rawMaterialId) {
                e.target.style.borderColor = 'var(--color-primary)';
              }
            }}
            onBlur={(e) => {
              if (!errors.rawMaterialId) {
                e.target.style.borderColor = 'var(--color-border)';
              }
            }}
          >
            {availableMaterials.map((material) => (
              <option key={material.id} value={material.id}>
                {material.name}
              </option>
            ))}
          </select>
          {errors.rawMaterialId && (
            <p
              style={{
                fontSize: 'var(--font-size-small)',
                color: 'var(--color-error)',
                marginTop: 'var(--spacing-xs)',
              }}
            >
              {errors.rawMaterialId}
            </p>
          )}
        </div>

        {/* Quantity Required */}
        <div>
          <label
            htmlFor="requiredQuantity
            "
            style={{
              display: 'block',
              fontSize: 'var(--font-size-secondary)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--spacing-sm)',
            }}
          >
            Quantity Required
          </label>
          <input
            type="number"
            id="requiredQuantity"
            value={formData.requiredQuantity}
            onChange={(e) => setFormData({ ...formData, requiredQuantity: parseInt(e.target.value) || 0 })}
            style={{
              width: '100%',
              padding: 'var(--spacing-md)',
              fontSize: 'var(--font-size-secondary)',
              color: 'var(--color-text-primary)',
              backgroundColor: 'var(--color-surface)',
              border: `1px solid ${errors.requiredQuantity ? 'var(--color-error)' : 'var(--color-border)'}`,
              borderRadius: 'var(--radius-md)',
              outline: 'none',
              transition: 'var(--transition-fast)',
            }}
            onFocus={(e) => {
              if (!errors.requiredQuantity) {
                e.target.style.borderColor = 'var(--color-primary)';
              }
            }}
            onBlur={(e) => {
              if (!errors.requiredQuantity) {
                e.target.style.borderColor = 'var(--color-border)';
              }
            }}
          />
          {errors.requiredQuantity && (
            <p
              style={{
                fontSize: 'var(--font-size-small)',
                color: 'var(--color-error)',
                marginTop: 'var(--spacing-xs)',
              }}
            >
              {errors.requiredQuantity}
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
            Add
          </button>
        </div>
      </div>
    </form>
  );
}
