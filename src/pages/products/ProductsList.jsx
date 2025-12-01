
import { useNavigate } from 'react-router-dom'
import { Button, Stack } from '@mui/material'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ProductsAPI, MastersAPI } from '../../services/api'
import DataTable from '../../components/DataTable'

export default function ProductsList() {
  const navigate = useNavigate()
  const qc = useQueryClient()
  const { data: products = [], isLoading } = useQuery({ queryKey: ['products'], queryFn: ProductsAPI.list })
  const { data: categories = [] } = useQuery({ queryKey: ['categories'], queryFn: MastersAPI.listCategories })
  const { data: subcategories = [] } = useQuery({ queryKey: ['subcategories'], queryFn: MastersAPI.listSubcategories })
  const { data: brands = [] } = useQuery({ queryKey: ['brands'], queryFn: MastersAPI.listBrands })

  const removeMutation = useMutation({ mutationFn: (id) => ProductsAPI.remove(id), onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }) })

  const catName = id => categories.find(c => c.id === id)?.name || '-'
  const subName = id => subcategories.find(s => s.id === id)?.name || '-'
  const brandName = id => brands.find(b => b.id === id)?.name || '-'

  const columns = [
    { header: 'Name', accessorKey: 'name' },
    { header: 'SKU', accessorKey: 'sku' },
    { header: 'Slug', accessorKey: 'slug' },
    { header: 'Price', cell: ({ row }) => `₹${row.original.price}` },
    { header: 'Stock', accessorKey: 'stock' },
    { header: 'Category', cell: ({ row }) => catName(row.original.categoryId) },
    { header: 'Subcategory', cell: ({ row }) => subName(row.original.subcategoryId) },
    { header: 'Brand', cell: ({ row }) => brandName(row.original.brandId) },
    { header: 'Active', cell: ({ row }) => row.original.active ? 'Yes' : 'No' },
    { header: 'Actions', cell: ({ row }) => (
      <Stack direction="row" spacing={1}>
        <Button size="small" onClick={() => navigate(`/products/${row.original.id}`)}>Edit</Button>
        <Button size="small" color="error" onClick={() => removeMutation.mutate(row.original.id)}>Delete</Button>
      </Stack>
    )}
  ]

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between">
        <Button variant="contained" onClick={() => navigate('/products/new')}>Add Product</Button>
      </Stack>
      {isLoading ? 'Loading…' : (
        <DataTable columns={columns} data={products} />
      )}
    </Stack>
  )
}
