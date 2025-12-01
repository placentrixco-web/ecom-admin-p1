
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Box, useMediaQuery } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import InventoryIcon from '@mui/icons-material/Inventory'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import PeopleIcon from '@mui/icons-material/People'
import PaymentIcon from '@mui/icons-material/Payment'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import CategoryIcon from '@mui/icons-material/Category'
import LabelIcon from '@mui/icons-material/Label'
import StorefrontIcon from '@mui/icons-material/Storefront'
import MenuIcon from '@mui/icons-material/Menu'
import useAuthStore from '../../store/authStore'
import useThemeStore from '../../store/themeStore'
import useUIStore from '../../store/uiStore'
import { useTheme } from '@mui/material/styles'

const drawerWidth = 240

export default function AppLayout() {
  const logout = useAuthStore(s => s.logout)
  const toggleTheme = useThemeStore(s => s.toggle)
  const navigate = useNavigate()
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const sidebarOpen = useUIStore(s => s.sidebarOpen)
  const toggleSidebar = useUIStore(s => s.toggleSidebar)

  const drawerContent = (
    <>
      <Toolbar />
      <List>
        <NavLink to="/dashboard">
          <ListItem button>
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </NavLink>
        <NavLink to="/products">
          <ListItem button>
            <ListItemIcon><InventoryIcon /></ListItemIcon>
            <ListItemText primary="Products" />
          </ListItem>
        </NavLink>
        <NavLink to="/catalog/categories">
          <ListItem button>
            <ListItemIcon><CategoryIcon /></ListItemIcon>
            <ListItemText primary="Categories" />
          </ListItem>
        </NavLink>
        <NavLink to="/catalog/subcategories">
          <ListItem button>
            <ListItemIcon><LabelIcon /></ListItemIcon>
            <ListItemText primary="Subcategories" />
          </ListItem>
        </NavLink>
        <NavLink to="/catalog/brands">
          <ListItem button>
            <ListItemIcon><StorefrontIcon /></ListItemIcon>
            <ListItemText primary="Brands" />
          </ListItem>
        </NavLink>
        <NavLink to="/orders">
          <ListItem button>
            <ListItemIcon><ReceiptLongIcon /></ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItem>
        </NavLink>
        <NavLink to="/customers">
          <ListItem button>
            <ListItemIcon><PeopleIcon /></ListItemIcon>
            <ListItemText primary="Customers" />
          </ListItem>
        </NavLink>
        <NavLink to="/payments">
          <ListItem button>
            <ListItemIcon><PaymentIcon /></ListItemIcon>
            <ListItemText primary="Payments" />
          </ListItem>
        </NavLink>
        <NavLink to="/settings/payments">
          <ListItem button>
            <ListItemIcon><SettingsIcon /></ListItemIcon>
            <ListItemText primary="Payment Settings" />
          </ListItem>
        </NavLink>
      </List>
    </>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          {/* Toggle button visible on both mobile & desktop */}
          <IconButton color="inherit" edge="start" onClick={toggleSidebar} sx={{ mr: 1 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>E‑Com Admin</Typography>
          <IconButton color="inherit" onClick={toggleTheme}><Brightness4Icon /></IconButton>
          <IconButton color="inherit" onClick={() => { logout(); navigate('/login') }}><LogoutIcon /></IconButton>
        </Toolbar>
      </AppBar>

      {/* Responsive Drawer */}
      {isDesktop ? (
        sidebarOpen && (
          <Drawer variant="permanent" sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }
          }}>
            {drawerContent}
          </Drawer>
        )
      ) : (
        <Drawer variant="temporary" open={sidebarOpen} onClose={toggleSidebar} ModalProps={{ keepMounted: true }} sx={{
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }
        }}>
          {drawerContent}
        </Drawer>
      )}

      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 3 } }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  )
}
