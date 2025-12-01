
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Paper, TextField, Button, Grid, FormControlLabel, Switch, Typography, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ProductsAPI, MastersAPI } from '../../services/api'
import slugify from '../../utils/slugify'

export default function ProductForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const qc = useQueryClient()

  const { data: existing } = useQuery({ queryKey: ['product', id], queryFn: () => id ? ProductsAPI.get(id) : Promise.resolve(undefined), enabled: !!id })

  const [form, setForm] = useState({
    name: '', sku: '', price: 0, stock: 0, active: true,
    categoryId: '', subcategoryId: '', brandId: '',
    slug: '', metaTitle: '', metaDescription: '', metaKeywords: ''
  })

  useEffect(() => { if (existing) { const { id: _id, ...rest } = existing; setForm(rest) } }, [existing])

  const createMutation = useMutation({ mutationFn: (input) => ProductsAPI.create(input), onSuccess: () => { qc.invalidateQueries({ queryKey: ['products'] }); navigate('/products') } })
  const updateMutation = useMutation({ mutationFn: (payload) => ProductsAPI.update(payload.id, payload.input), onSuccess: () => { qc.invalidateQueries({ queryKey: ['products'] }); navigate('/products') } })

  const { data: categories = [] } = useQuery({ queryKey: ['categories'], queryFn: MastersAPI.listCategories })
  const { data: subcategories = [] } = useQuery({ queryKey: ['subcategories'], queryFn: MastersAPI.listSubcategories })
  const { data: brands = [] } = useQuery({ queryKey: ['brands'], queryFn: MastersAPI.listBrands })

  const filteredSubs = subcategories.filter(sc => sc.categoryId === (form.categoryId || (existing?.categoryId || '')))

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = { ...form, slug: form.slug || slugify(form.name) }
    if (id) updateMutation.mutate({ id, input: payload })
    else createMutation.mutate(payload)
  }

  const updateField = (key, value) => setForm(prev => ({ ...prev, [key]: value }))

  return (
    <Paper sx={{ p: { xs: 2, md: 3 } }}>
      <Typography variant="h6" gutterBottom>{id ? 'Edit Product' : 'New Product'}</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField label="Name" fullWidth required value={form.name} onChange={e => updateField('name', e.target.value)} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="SKU" fullWidth required value={form.sku} onChange={e => updateField('sku', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField type="number" label="Price" fullWidth required value={form.price} onChange={e => updateField('price', Number(e.target.value))} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField type="number" label="Stock" fullWidth required value={form.stock} onChange={e => updateField('stock', Number(e.target.value))} />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id='cat-label'>Category</InputLabel>
              <Select labelId='cat-label' label='Category' required value={form.categoryId} onChange={e => updateField('categoryId', e.target.value)}>
                {categories.map(c => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id='sub-label'>Subcategory</InputLabel>
              <Select labelId='sub-label' label='Subcategory' required value={form.subcategoryId} onChange={e => updateField('subcategoryId', e.target.value)}>
                {filteredSubs.map(sc => <MenuItem key={sc.id} value={sc.id}>{sc.name}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id='brand-label'>Brand</InputLabel>
              <Select labelId='brand-label' label='Brand' required value={form.brandId} onChange={e => updateField('brandId', e.target.value)}>
                {brands.map(b => <MenuItem key={b.id} value={b.id}>{b.name}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>

          {/* SEO */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>SEO</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Slug" fullWidth placeholder="auto from name" value={form.slug} onChange={e => updateField('slug', e.target.value)} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>Preview:</Typography>
              <Typography variant="caption">/products/{form.slug || slugify(form.name)}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Meta Title" fullWidth value={form.metaTitle} onChange={e => updateField('metaTitle', e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Meta Description" fullWidth multiline minRows={2} value={form.metaDescription} onChange={e => updateField('metaDescription', e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Meta Keywords" fullWidth placeholder="comma,separated,keywords" value={form.metaKeywords} onChange={e => updateField('metaKeywords', e.target.value)} />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel control={<Switch checked={form.active} onChange={e => updateField('active', e.target.checked)} />} label="Active" />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained">Save</Button>
            <Button sx={{ ml: 1 }} onClick={() => navigate(-1)}>Cancel</Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  )
}
