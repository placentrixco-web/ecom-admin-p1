
import { Grid, Paper, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { ProductsAPI, OrdersAPI, CustomersAPI, StatsAPI } from '../services/api'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid, Legend } from 'recharts'

export default function Dashboard() {
  const { data: products = [] } = useQuery({ queryKey: ['products'], queryFn: ProductsAPI.list })
  const { data: orders = [] } = useQuery({ queryKey: ['orders'], queryFn: OrdersAPI.list })
  const { data: customers = [] } = useQuery({ queryKey: ['customers'], queryFn: CustomersAPI.list })
  const { data: stats = { revenueTrend: [], categoryBreakdown: [] } } = useQuery({ queryKey: ['stats'], queryFn: StatsAPI.overview })

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2">Products</Typography>
          <Typography variant="h4">{products.length}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2">Orders</Typography>
          <Typography variant="h4">{orders.length}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2">Customers</Typography>
          <Typography variant="h4">{customers.length}</Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2" gutterBottom>Revenue (Last 12 months)</Typography>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={stats.revenueTrend}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#800020" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#800020" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke="#800020" fillOpacity={1} fill="url(#colorRev)" />
            </AreaChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2" gutterBottom>Sales by Category</Typography>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={stats.categoryBreakdown}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#800020" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
    </Grid>
  )
}
