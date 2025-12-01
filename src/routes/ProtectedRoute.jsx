
import { Navigate, useLocation } from 'react-router-dom'
import useAuthStore from '../store/authStore'
export default function ProtectedRoute({ children }) {
  const isAuth = useAuthStore(s => s.isAuthenticated)
  const location = useLocation()
  if (!isAuth) return <Navigate to="/login" replace state={{ from: location }} />
  return <>{children}</>
}
