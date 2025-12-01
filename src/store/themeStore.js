
import { create } from 'zustand'
const useThemeStore = create(set => ({
  mode: localStorage.getItem('theme') || 'light',
  toggle: () => set(state => {
    const next = state.mode === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', next)
    return { mode: next }
  })
}))
export default useThemeStore
