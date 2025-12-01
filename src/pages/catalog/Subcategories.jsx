
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { MastersAPI } from '../../services/api'
import DataTable from '../../components/DataTable'
import { Button, Stack, Dialog, DialogTitle, DialogContent, TextField, DialogActions, MenuItem, Select, InputLabel, FormControl } from '@mui/material'

export default function Subcategories() {
  const qc = useQueryClient()
  const { data: categories = [] } = useQuery({ queryKey: ['categories'], queryFn: MastersAPI.listCategories })
  const { data: subcategories = [], isLoading } = useQuery({ queryKey: ['subcategories'], queryFn: MastersAPI.listSubcategories })

  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [editId, setEditId] = useState(null)

  const createMutation = useMutation({ mutationFn: (payload) => MastersAPI.createSubcategory(payload), onSuccess: () => { qc.invalidateQueries({ queryKey: ['subcategories'] }); setOpen(false); setName(''); setCategoryId('') } })
  const updateMutation = useMutation({ mutationFn: ({ id, input }) => MastersAPI.updateSubcategory(id, input), onSuccess: () => { qc.invalidateQueries({ queryKey: ['subcategories'] }); setOpen(false); setName(''); setCategoryId(''); setEditId(null) } })
  const removeMutation = useMutation({ mutationFn: (id) => MastersAPI.removeSubcategory(id), onSuccess: () => qc.invalidateQueries({ queryKey: ['subcategories'] }) })

  const columns = [
    { header: 'Name', accessorKey: 'name' },
    { header: 'Category', cell: ({ row }) => categories.find(c => c.id === row.original.categoryId)?.name || '-' },
    { header: 'Actions', cell: ({ row }) => (
      <Stack direction='row' spacing={1}>
        <Button size='small' onClick={() => { setEditId(row.original.id); setName(row.original.name); setCategoryId(row.original.categoryId); setOpen(true) }}>Edit</Button>
        <Button size='small' color='error' onClick={() => removeMutation.mutate(row.original.id)}>Delete</Button>
      </Stack>
    ) }
  ]

  const save = () => {
    if (!categoryId) return
    const payload = { name, categoryId }
    if (editId) updateMutation.mutate({ id: editId, input: payload })
    else createMutation.mutate(payload)
  }

  return (
    <Stack spacing={2}>
      <Stack direction='row' justifyContent='space-between'>
        <Button variant='contained' onClick={() => { setOpen(true); setEditId(null); setName(''); setCategoryId('') }}>Add Subcategory</Button>
      </Stack>
      {isLoading ? 'Loading…' : <DataTable columns={columns} data={subcategories} />}

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editId ? 'Edit Subcategory' : 'New Subcategory'}</DialogTitle>
        <DialogContent>
          <TextField autoFocus label='Name' fullWidth value={name} onChange={e => setName(e.target.value)} sx={{ mt: 1 }} />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id='cat-label'>Category</InputLabel>
            <Select labelId='cat-label' label='Category' value={categoryId} onChange={e => setCategoryId(e.target.value)}>
              {categories.map(c => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={save} variant='contained'>Save</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  )
}
