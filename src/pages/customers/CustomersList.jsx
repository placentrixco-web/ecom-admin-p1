
import { useQuery } from '@tanstack/react-query'
import { CustomersAPI } from '../../services/api'
import DataTable from '../../components/DataTable'

const columns = [
  { header: 'Name', accessorKey: 'name' },
  { header: 'Email', accessorKey: 'email' },
  { header: 'Phone', accessorKey: 'phone' },
  { header: 'Joined', accessorKey: 'joined' },
]

export default function CustomersList() {
  const { data: customers = [], isLoading } = useQuery({ queryKey: ['customers'], queryFn: CustomersAPI.list })
  return isLoading ? 'Loading…' : (
    <DataTable columns={columns} data={customers} />
  )
}
