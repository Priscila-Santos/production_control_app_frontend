import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Plus, Trash2, ArrowLeft } from "lucide-react";

import { DataTable } from "../components/shared/DataTable";
import { Dialog } from "../components/shared/Dialog";
import { CompositionForm } from "../components/composition/CompositionForm";

import {
  useGetProductCompositionQuery,
  useAddCompositionMutation,
  useDeleteCompositionMutation
} from "../../features/compositions/compositionsApi";

import { useGetRawMaterialsQuery } from "../../features/rawMaterials/rawMaterialsApi";
import { useGetProductsQuery } from "../../features/products/productsApi";

interface Composition {
  productId: number
  rawMaterialId: number
  rawMaterialName: string
  requiredQuantity: number
}

export function ProductComposition() {

  const { productId } = useParams<{ productId: string }>()
  const navigate = useNavigate()

  const numericProductId = Number(productId)

  const { data: compositions = [] } =
    useGetProductCompositionQuery(numericProductId)

  const { data: materials = [] } =
    useGetRawMaterialsQuery(undefined)

  const { data: products = [] } =
    useGetProductsQuery(undefined)

  const [addComposition] = useAddCompositionMutation()
  const [deleteComposition] = useDeleteCompositionMutation()

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const product = products.find(p => p.id === numericProductId)

  if (!product) {
    return (
      <div>
        <p>Product not found</p>
      </div>
    )
  }

  const handleAdd = async (data: { rawMaterialId:number, requiredQuantity:number }) => {

    await addComposition({
      productId: numericProductId,
      rawMaterialId: data.rawMaterialId,
      requiredQuantity: data.requiredQuantity
    })

    setIsDialogOpen(false)

  }

  const handleDelete = async (rawMaterialId:number) => {

    if(confirm("Are you sure you want to remove this material?")){

      await deleteComposition({
        productId: numericProductId,
        rawMaterialId: rawMaterialId
      })

    }

  }

  const columns = [

    { key:"rawMaterialName", label:"Raw Material", width:"50%" },

    { key:"requiredQuantity", label:"Quantity Required", width:"35%" },

    {
      key:"actions",
      label:"Actions",
      width:"15%",
      render:(_:any,row:Composition)=>(
        <button
          onClick={()=>handleDelete(row.rawMaterialId)}
          style={{
            padding:"var(--spacing-sm)",
            borderRadius:"var(--radius-md)",
            border:"1px solid var(--color-border)",
            backgroundColor:"var(--color-surface)",
            cursor:"pointer",
            color:"var(--color-error)"
          }}
          onMouseEnter={(e)=>{
            e.currentTarget.style.backgroundColor="var(--color-error-soft)"
          }}
          onMouseLeave={(e)=>{
            e.currentTarget.style.backgroundColor="var(--color-surface)"
          }}
        >
          <Trash2 size={16}/>
        </button>
      )
    }

  ]

  return (

    <div>

      {/* Back Button */}

      <button
        onClick={()=>navigate("/products")}
        style={{
          display:"flex",
          alignItems:"center",
          gap:"var(--spacing-sm)",
          padding:"var(--spacing-sm) var(--spacing-md)",
          backgroundColor:"transparent",
          color:"var(--color-text-secondary)",
          border:"1px solid var(--color-border)",
          borderRadius:"var(--radius-md)",
          fontSize:"var(--font-size-secondary)",
          cursor:"pointer",
          marginBottom:"var(--spacing-xl)"
        }}
        onMouseEnter={(e)=>{
          e.currentTarget.style.backgroundColor="var(--color-surface-secondary)"
        }}
        onMouseLeave={(e)=>{
          e.currentTarget.style.backgroundColor="transparent"
        }}
      >
        <ArrowLeft size={16}/>
        Back to Products
      </button>

      {/* Header */}

      <div
        style={{
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center",
          marginBottom:"var(--spacing-2xl)"
        }}
      >

        <div>

          <h1 className="page-title">Product Composition</h1>

          <p
            style={{
              fontSize:"var(--font-size-card-title)",
              color:"var(--color-text-primary)",
              marginTop:"var(--spacing-sm)",
              fontWeight:"var(--font-weight-medium)"
            }}
          >
            {product.name}
          </p>

          <p
            style={{
              fontSize:"var(--font-size-secondary)",
              color:"var(--color-text-secondary)",
              marginTop:"var(--spacing-xs)"
            }}
          >
            Define the raw materials required to produce this product
          </p>

        </div>

        <button
          onClick={()=>setIsDialogOpen(true)}
          style={{
            display:"flex",
            alignItems:"center",
            gap:"var(--spacing-sm)",
            padding:"var(--spacing-md) var(--spacing-xl)",
            backgroundColor:"var(--color-primary)",
            color:"white",
            border:"none",
            borderRadius:"var(--radius-md)",
            fontSize:"var(--font-size-secondary)",
            fontWeight:"var(--font-weight-medium)",
            cursor:"pointer"
          }}
        >
          <Plus size={18}/>
          Add Raw Material
        </button>

      </div>

      {/* Table */}

      {compositions.length > 0 ? (

        <DataTable
          columns={columns}
          data={compositions}
        />

      ) : (

        <div
          style={{
            backgroundColor:"var(--color-surface)",
            borderRadius:"var(--radius-lg)",
            padding:"var(--spacing-3xl)",
            border:"1px solid var(--color-border)",
            textAlign:"center"
          }}
        >

          <p
            style={{
              fontSize:"var(--font-size-body)",
              color:"var(--color-text-secondary)"
            }}
          >
            No raw materials added yet. Click "Add Raw Material" to start building the composition.
          </p>

        </div>

      )}

      {/* Dialog */}

      <Dialog
        isOpen={isDialogOpen}
        onClose={()=>setIsDialogOpen(false)}
        title="Add Raw Material"
      >

        <CompositionForm
          availableMaterials={materials}
          onSubmit={handleAdd}
          onCancel={()=>setIsDialogOpen(false)}
        />

      </Dialog>

    </div>

  )

}