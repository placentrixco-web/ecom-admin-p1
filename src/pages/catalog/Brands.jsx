
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { MastersAPI } from '../../services/api'
import DataTable from '../../components/DataTable'
import { Button, Stack, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material'

export default function Brands() {
  const qc = useQueryClient()
  const { data: brands = [], isLoading } = useQuery({ queryKey: ['brands'], queryFn: MastersAPI.listBrands })

  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [editId, setEditId] = useState(null)

  const createMutation = useMutation({ mutationFn: (payload) => MastersAPI.createBrand(payload), onSuccess: () => { qc.invalidateQueries({ queryKey: ['brands'] }); setOpen(false); setName('') } })
  const updateMutation = useMutation({ mutationFn: ({ id, input }) => MastersAPI.updateBrand(id, input), onSuccess: () => { qc.invalidateQueries({ queryKey: ['brands'] }); setOpen(false); setName(''); setEditId(null) } })
  const removeMutation = useMutation({ mutationFn: (id) => MastersAPI.removeBrand(id), onSuccess: () => qc.invalidateQueries({ queryKey: ['brands'] }) })

  const columns = [
    { header: 'Name', accessorKey: 'name' },
    { header: 'Actions', cell: ({ row }) => (
      <Stack direction='row' spacing={1}>
        <Button size='small' onClick={() => { setEditId(row.original.id); setName(row.original.name); setOpen(true) }}>Edit</Button>
        <Button size='small' color='error' onClick={() => removeMutation.mutate(row.original.id)}>Delete</Button>
      </Stack>
    ) }
  ]

  const save = () => { if (editId) updateMutation.mutate({ id: editId, input: { name } }); else createMutation.mutate({ name }) }

  return (
    <Stack spacing={2}>
      <Stack direction='row' justifyContent='space-between'>
        <Button variant='contained' onClick={() => { setOpen(true); setEditId(null); setName('') }}>Add Brand</Button>
      </Stack>
      {isLoading ? 'Loading…' : <DataTable columns={columns} data={brands} />}

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editId ? 'Edit Brand' : 'New Brand'}</DialogTitle>
        <DialogContent>
          <TextField autoFocus label='Name' fullWidth value={name} onChange={e => setName(e.target.value)} sx={{ mt: 1 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={save} variant='contained'>Save</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  )
}
