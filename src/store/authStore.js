
import { create } from 'zustand'
const useAuthStore = create(set => ({
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  login: async (username, password) => {
    const ok = username === 'admin' && password === 'admin123'
    if (ok) {
      const token = 'demo-token'
      localStorage.setItem('token', token)
      set({ token, isAuthenticated: true })
      return true
    }
    return false
  },
  logout: () => {
    localStorage.removeItem('token')
    set({ token: null, isAuthenticated: false })
  }
}))
export default useAuthStore
