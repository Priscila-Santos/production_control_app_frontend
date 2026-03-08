import { useState } from "react";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { DataTable } from "../components/shared/DataTable";
import { Dialog } from "../components/shared/Dialog";
import { ProductForm } from "../components/products/ProductForm";
import { useNavigate } from "react-router";

import {
  useGetProductsQuery,
  useCreateProductMutation,
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

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
    }
  };

  const openCreateDialog = () => {
    setEditingProduct(null);
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
        onClose={() => setIsDialogOpen(false)}
        title="Create Product"
      >
        <ProductForm
          onSubmit={handleCreate}
          onCancel={() => setIsDialogOpen(false)}
        />
      </Dialog>
    </div>
  );
}

// import React, { useState } from "react";
// import {
//   useGetProductsQuery,
//   useCreateProductMutation,
//   useDeleteProductMutation,
// } from "../../features/products/productsApi";

// export const Products = () => {
//   const { data: products, isLoading } = useGetProductsQuery(undefined);

//   const [createProduct] = useCreateProductMutation();
//   const [deleteProduct] = useDeleteProductMutation();

//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");

//   const handleCreate = async () => {
//     await createProduct({
//       name,
//       price: Number(price),
//     });

//     setName("");
//     setPrice("");
//   };

//   const handleDelete = async (id: number) => {
//     await deleteProduct(id);
//   };

//   if (isLoading) return <p>Loading...</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Products</h1>

//       <div className="mb-6">
//         <input
//           className="border p-2 mr-2"
//           placeholder="Product Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />

//         <input
//           className="border p-2 mr-2"
//           placeholder="Price"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//         />

//         <button
//           className="bg-blue-500 text-white px-4 py-2"
//           onClick={handleCreate}
//         >
//           Add Product
//         </button>
//       </div>

//       <table className="w-full border">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="p-2">Name</th>
//             <th className="p-2">Price</th>
//             <th className="p-2">Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {products?.map((product) => (
//             <tr key={product.id}>
//               <td className="p-2">{product.name}</td>
//               <td className="p-2">{product.price}</td>
//               <td className="p-2">
//                 <button
//                   className="text-red-500"
//                   onClick={() => handleDelete(product.id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Products;