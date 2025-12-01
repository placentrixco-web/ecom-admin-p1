
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { PaymentsAPI } from '../../services/api'
import DataTable from '../../components/DataTable'
import { Button, Stack } from '@mui/material'

const columnsBase = [
  { header: 'Txn ID', accessorKey: 'id' },
  { header: 'Order No', accessorKey: 'orderNo' },
  { header: 'Gateway', accessorKey: 'gateway' },
  { header: 'Amount', cell: ({ row }) => `₹${row.original.amount}` },
  { header: 'Status', accessorKey: 'status' },
  { header: 'Created', accessorKey: 'createdAt' },
]

export default function PaymentsList() {
  const qc = useQueryClient()
  const { data: payments = [], isLoading } = useQuery({ queryKey: ['payments'], queryFn: PaymentsAPI.list })
  const refundMutation = useMutation({ mutationFn: (id) => PaymentsAPI.refund(id), onSuccess: () => qc.invalidateQueries({ queryKey: ['payments'] }) })

  const columns = [ ...columnsBase,
    { header: 'Actions', cell: ({ row }) => (
      <Stack direction="row" spacing={1}>
        <Button size="small" disabled={row.original.status !== 'Captured'} onClick={() => refundMutation.mutate(row.original.id)}>Refund</Button>
      </Stack>
    ) }
  ]

  return isLoading ? 'Loading…' : (
    <DataTable columns={columns} data={payments} />
  )
}
