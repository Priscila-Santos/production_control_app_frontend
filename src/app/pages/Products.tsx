import { useState } from "react";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { DataTable } from "../components/shared/DataTable";
import { Dialog } from "../components/shared/Dialog";
import { ProductForm } from "../components/products/ProductForm";
import { useNavigate } from "react-router";

import {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "../../features/products/productsApi";

interface Product {
  id: number;
  name: string;
  price: number;
}

export function Products() {
  const navigate = useNavigate();

  const { data: products = [], isLoading } = useGetProductsQuery(undefined);

  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  if (isLoading) return <p>Loading...</p>;

  const filteredProducts = products.filter((product: Product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreate = async (data: { name: string; price: number }) => {
    await createProduct(data);
    setIsDialogOpen(false);
  };

  const handleEdit = async (data: { name: string; price: number }) => {
    if (!editingProduct) return;

    await updateProduct({
      id: editingProduct.id,
      ...data,
    });

    setEditingProduct(null);
    setIsDialogOpen(false);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
    }
  };

  const openCreateDialog = () => {
    setEditingProduct(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  const columns = [
    { key: "id", label: "Product ID", width: "15%" },
    { key: "name", label: "Product Name", width: "45%" },
    {
      key: "price",
      label: "Price",
      width: "25%",
      render: (value: number) => `$${value.toFixed(2)}`,
    },
    {
      key: "actions",
      label: "Actions",
      width: "15%",
      render: (_: any, row: Product) => (
        <div style={{ display: "flex", gap: "var(--spacing-sm)" }}>
          <button
            onClick={() => navigate(`/product-composition/${row.id}`)}
            style={{
              padding: "var(--spacing-sm)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-border)",
              backgroundColor: "var(--color-surface)",
              cursor: "pointer",
              color: "var(--color-primary)",
            }}
          >
            Composition
          </button>

          <button
            onClick={() => openEditDialog(row)}
            style={{
              padding: "var(--spacing-sm)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-border)",
              backgroundColor: "var(--color-surface)",
              cursor: "pointer",
            }}
          >
            <Edit size={16} />
          </button>

          <button
            onClick={() => handleDelete(row.id)}
            style={{
              padding: "var(--spacing-sm)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-border)",
              backgroundColor: "var(--color-surface)",
              cursor: "pointer",
              color: "var(--color-error)",
            }}
          >
            <Trash2 size={16} />
          </button>
        </div>
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
          <h1 className="page-title">Products</h1>
        </div>

        <button
          onClick={openCreateDialog}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--spacing-sm)",
            padding: "var(--spacing-md) var(--spacing-xl)",
            backgroundColor: "var(--color-primary)",
            color: "white",
            border: "none",
            borderRadius: "var(--radius-md)",
            cursor: "pointer",
          }}
        >
          <Plus size={18} />
          Create Product
        </button>
      </div>

      {/* Search */}
      <div style={{ marginBottom: "var(--spacing-xl)" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--spacing-md)",
            padding: "var(--spacing-md)",
            backgroundColor: "var(--color-surface)",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--color-border)",
            maxWidth: "25rem",
          }}
        >
          <Search size={18} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              border: "none",
              outline: "none",
              backgroundColor: "transparent",
              width: "100%",
            }}
          />
        </div>
      </div>

      {/* Table */}
      <DataTable columns={columns} data={filteredProducts} />

      {/* Dialog */}
      <Dialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setEditingProduct(null);
        }}
        title={editingProduct ? "Edit Product" : "Create Product"}
      >
        <ProductForm
          initialData={editingProduct || undefined}
          onSubmit={editingProduct ? handleEdit : handleCreate}
          onCancel={() => {
            setIsDialogOpen(false);
            setEditingProduct(null);
          }}
        />
      </Dialog>
    </div>
  );
}
