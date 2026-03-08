import { useState } from "react";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { DataTable } from "../components/shared/DataTable";
import { Dialog } from "../components/shared/Dialog";
import { RawMaterialForm } from "../components/rawMaterials/RawMaterialForm";

import {
  useGetRawMaterialsQuery,
  useCreateRawMaterialMutation,
  useUpdateRawMaterialMutation,
  useDeleteRawMaterialMutation,
} from "../../features/rawMaterials/rawMaterialsApi";

interface RawMaterial {
  id: number;
  name: string;
  stockQuantity: number;
}

export function RawMaterials() {

  const { data: rawMaterials = [], isLoading } = useGetRawMaterialsQuery(undefined);

  const [createMaterial] = useCreateRawMaterialMutation();
  const [updateMaterial] = useUpdateRawMaterialMutation();
  const [deleteMaterial] = useDeleteRawMaterialMutation();

  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<RawMaterial | null>(null);

  if (isLoading) return <p>Loading...</p>;

  const filteredMaterials = rawMaterials.filter((material: RawMaterial) =>
    material.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreate = async (data: { name: string; stockQuantity: number }) => {
    await createMaterial(data);
    setIsDialogOpen(false);
  };

  const handleEdit = async (data: { name: string; stockQuantity: number }) => {
    if (!editingMaterial) return;

    await updateMaterial({
      id: editingMaterial.id,
      ...data,
    });

    setEditingMaterial(null);
    setIsDialogOpen(false);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this raw material?")) {
      await deleteMaterial(id);
    }
  };

  const openCreateDialog = () => {
    setEditingMaterial(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (material: RawMaterial) => {
    setEditingMaterial(material);
    setIsDialogOpen(true);
  };

  const columns = [
    { key: "id", label: "ID", width: "15%" },
    { key: "name", label: "Material Name", width: "50%" },
    { key: "stockQuantity", label: "Stock Quantity", width: "20%" },
    {
      key: "actions",
      label: "Actions",
      width: "15%",
      render: (_: any, row: RawMaterial) => (
        <div style={{ display: "flex", gap: "var(--spacing-sm)" }}>
          <button
            onClick={() => openEditDialog(row)}
            style={{
              padding: "var(--spacing-sm)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-border)",
              backgroundColor: "var(--color-surface)",
              cursor: "pointer",
              color: "var(--color-text-secondary)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--color-surface-secondary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--color-surface)";
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
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--color-error-soft)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--color-surface)";
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
      {/* Page Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "var(--spacing-2xl)",
        }}
      >
        <div>
          <h1 className="page-title">Raw Materials</h1>

          <p
            style={{
              fontSize: "var(--font-size-secondary)",
              color: "var(--color-text-secondary)",
              marginTop: "var(--spacing-sm)",
            }}
          >
            Manage your raw materials inventory
          </p>
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
            fontSize: "var(--font-size-secondary)",
            fontWeight: "var(--font-weight-medium)",
            cursor: "pointer",
            transition: "var(--transition-fast)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--color-primary-hover)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--color-primary)";
          }}
        >
          <Plus size={18} />
          Add Material
        </button>
      </div>

      {/* Search */}
      <div style={{ marginBottom: "var(--spacing-xl)" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--spacing-md)",
            padding: "var(--spacing-md) var(--spacing-lg)",
            backgroundColor: "var(--color-surface)",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--color-border)",
            maxWidth: "25rem",
          }}
        >
          <Search size={18} style={{ color: "var(--color-text-muted)" }} />

          <input
            type="text"
            placeholder="Search materials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              border: "none",
              outline: "none",
              backgroundColor: "transparent",
              fontSize: "var(--font-size-secondary)",
              color: "var(--color-text-primary)",
              width: "100%",
            }}
          />
        </div>
      </div>

      {/* Table */}
      <DataTable columns={columns} data={filteredMaterials} />

      {/* Dialog */}
      <Dialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setEditingMaterial(null);
        }}
        title={editingMaterial ? "Edit Raw Material" : "Add Raw Material"}
      >
        <RawMaterialForm
          initialData={editingMaterial || undefined}
          onSubmit={editingMaterial ? handleEdit : handleCreate}
          onCancel={() => {
            setIsDialogOpen(false);
            setEditingMaterial(null);
          }}
        />
      </Dialog>
    </div>
  );
}
// import { useState } from "react";
// import { Plus, Search, Edit, Trash2 } from "lucide-react";
// import { DataTable } from "../components/shared/DataTable";
// import { Dialog } from "../components/shared/Dialog";
// import { RawMaterialForm } from "../components/rawMaterials/RawMaterialForm";

// import {
//   useGetRawMaterialsQuery,
//   useCreateRawMaterialMutation,
//   useUpdateRawMaterialMutation,
//   useDeleteRawMaterialMutation,
// } from "../../features/rawMaterials/rawMaterialsApi";

// export function RawMaterials() {

//   const { data: rawMaterials = [] } = useGetRawMaterialsQuery(undefined);

//   const [createMaterial] = useCreateRawMaterialMutation();
//   const [updateMaterial] = useUpdateRawMaterialMutation();
//   const [deleteMaterial] = useDeleteRawMaterialMutation();

//   const [searchQuery, setSearchQuery] = useState("");
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [editingMaterial, setEditingMaterial] = useState<any>(null);

//   const filteredMaterials = rawMaterials.filter((material) =>
//     material.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleCreate = async (data: any) => {
//     await createMaterial(data);
//     setIsDialogOpen(false);
//   };

//   const handleEdit = async (data: any) => {
//     if (!editingMaterial) return;

//     await updateMaterial({
//       id: editingMaterial.id,
//       ...data,
//     });

//     setEditingMaterial(null);
//     setIsDialogOpen(false);
//   };

//   const handleDelete = async (id: number) => {
//     if (confirm("Delete this material?")) {
//       await deleteMaterial(id);
//     }
//   };

//   const columns = [
//     { key: "id", label: "ID", width: "15%" },
//     { key: "name", label: "Material Name", width: "50%" },
//     { key: "stockQuantity", label: "Stock", width: "20%" },
//     {
//       key: "actions",
//       label: "Actions",
//       width: "15%",
//       render: (_: any, row: any) => (
//         <div style={{ display: "flex", gap: "8px" }}>
//           <button onClick={() => {
//             setEditingMaterial(row);
//             setIsDialogOpen(true);
//           }}>
//             <Edit size={16}/>
//           </button>

//           <button onClick={() => handleDelete(row.id)}>
//             <Trash2 size={16}/>
//           </button>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div>

//       <h1 className="page-title">Raw Materials</h1>

//       <button onClick={() => setIsDialogOpen(true)}>
//         <Plus size={16}/> Add Material
//       </button>

//       <input
//         placeholder="Search..."
//         value={searchQuery}
//         onChange={(e)=>setSearchQuery(e.target.value)}
//       />

//       <DataTable columns={columns} data={filteredMaterials} />

//       <Dialog
//         isOpen={isDialogOpen}
//         onClose={()=>setIsDialogOpen(false)}
//         title="Raw Material"
//       >
//         <RawMaterialForm
//           initialData={editingMaterial || undefined}
//           onSubmit={editingMaterial ? handleEdit : handleCreate}
//           onCancel={()=>setIsDialogOpen(false)}
//         />
//       </Dialog>

//     </div>
//   );
// }