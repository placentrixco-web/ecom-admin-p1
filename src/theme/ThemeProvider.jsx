
import { useMemo } from 'react'
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import useThemeStore from '../store/themeStore'

const BRAND_PRIMARY = '#800020'
const BRAND_BG = '#F5F0E1'

export default function ThemeProvider({ children }) {
  const mode = useThemeStore(s => s.mode)
  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: { main: BRAND_PRIMARY },
      ...(mode === 'light' ? {
        background: { default: BRAND_BG, paper: '#ffffff' },
        text: { primary: '#111', secondary: '#555' }
      } : {})
    },
    components: {
      MuiDrawer: { styleOverrides: { paper: { backgroundImage: 'none' } } },
      MuiAppBar: { defaultProps: { color: 'primary' } }
    }
  }), [mode])

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  )
}
