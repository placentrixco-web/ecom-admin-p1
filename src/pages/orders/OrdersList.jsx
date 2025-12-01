
import { useQuery } from '@tanstack/react-query'
import { OrdersAPI } from '../../services/api'
import DataTable from '../../components/DataTable'

const columns = [
  { header: 'Order No', accessorKey: 'orderNo' },
  { header: 'Date', accessorKey: 'date' },
  { header: 'Customer', accessorKey: 'customerName' },
  { header: 'Status', accessorKey: 'status' },
  { header: 'Total', cell: ({ row }) => `₹${row.original.total}` },
]

export default function OrdersList() {
  const { data: orders = [], isLoading } = useQuery({ queryKey: ['orders'], queryFn: OrdersAPI.list })
  return isLoading ? 'Loading…' : (
    <DataTable columns={columns} data={orders} />
  )
}
