
import { useState } from 'react'
import { Paper, TextField, Button, Typography, Box } from '@mui/material'
import useAuthStore from '../../store/authStore'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const login = useAuthStore(s => s.login)
  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const ok = await login(username, password)
    if (ok) {
      const to = location.state?.from?.pathname || '/dashboard'
      navigate(to)
    } else {
      setError('Invalid credentials')
    }
  }

  return (
    <Box sx={{ display: 'grid', placeItems: 'center', height: '100vh', p: 2 }}>
      <Paper sx={{ p: 4, width: { xs: '100%', sm: 360 } }}>
        <Typography variant="h6" gutterBottom>Admin Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Username" fullWidth margin="normal" value={username} onChange={e => setUsername(e.target.value)} />
          <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
          {error && <Typography color="error" variant="body2">{error}</Typography>}
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Login</Button>
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>Demo: admin / admin123</Typography>
        </form>
      </Paper>
    </Box>
  )
}
