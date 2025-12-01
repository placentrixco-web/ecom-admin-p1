
import { create } from 'zustand'
const useUIStore = create(set => ({
  sidebarOpen: true,
  toggleSidebar: () => set(state => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebar: (open) => set({ sidebarOpen: open })
}))
export default useUIStore
