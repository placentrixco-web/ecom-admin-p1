
import { CssBaseline, Box } from '@mui/material'
import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import ProductsList from './pages/products/ProductsList'
import ProductForm from './pages/products/ProductForm'
import OrdersList from './pages/orders/OrdersList'
import CustomersList from './pages/customers/CustomersList'
import PaymentsList from './pages/payments/PaymentsList'
import PaymentSettings from './pages/settings/PaymentSettings'
import Login from './pages/auth/Login'
import Categories from './pages/catalog/Categories'
import Subcategories from './pages/catalog/Subcategories'
import Brands from './pages/catalog/Brands'
import AppLayout from './components/layout/AppLayout'
import ProtectedRoute from './routes/ProtectedRoute'

export default function App() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/products/new" element={<ProductForm />} />
          <Route path="/products/:id" element={<ProductForm />} />
          <Route path="/catalog/categories" element={<Categories />} />
          <Route path="/catalog/subcategories" element={<Subcategories />} />
          <Route path="/catalog/brands" element={<Brands />} />
          <Route path="/orders" element={<OrdersList />} />
          <Route path="/customers" element={<CustomersList />} />
          <Route path="/payments" element={<PaymentsList />} />
          <Route path="/settings/payments" element={<PaymentSettings />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Box>
  )
}
