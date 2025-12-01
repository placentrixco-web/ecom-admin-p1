
import { useEffect, useState } from 'react'
import { Paper, Typography, Grid, TextField, Switch, FormControlLabel, Button } from '@mui/material'
import { PaymentsAPI } from '../../services/api'

export default function PaymentSettings() {
  const [settings, setSettings] = useState({ gateway: 'razorpay', testMode: true, publishableKey: '', secretKey: '' })
  useEffect(() => { PaymentsAPI.getSettings().then(setSettings) }, [])
  const save = async (e) => { e.preventDefault(); await PaymentsAPI.saveSettings(settings); alert('Settings saved (mock)') }

  return (
    <Paper sx={{ p: { xs: 2, md: 3 } }}>
      <Typography variant="h6" gutterBottom>Payment Settings</Typography>
      <form onSubmit={save}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}><TextField label="Gateway" fullWidth value={settings.gateway} onChange={e => setSettings(s => ({ ...s, gateway: e.target.value }))} /></Grid>
          <Grid item xs={12} md={6}><FormControlLabel control={<Switch checked={settings.testMode} onChange={e => setSettings(s => ({ ...s, testMode: e.target.checked }))} />} label="Test Mode" /></Grid>
          <Grid item xs={12} md={6}><TextField label="Publishable Key" fullWidth value={settings.publishableKey} onChange={e => setSettings(s => ({ ...s, publishableKey: e.target.value }))} /></Grid>
          <Grid item xs={12} md={6}><TextField label="Secret Key" type="password" fullWidth value={settings.secretKey} onChange={e => setSettings(s => ({ ...s, secretKey: e.target.value }))} /></Grid>
          <Grid item xs={12}><Button type="submit" variant="contained">Save</Button></Grid>
        </Grid>
      </form>
      <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>Note: Wire these keys in your backend; never expose real secrets in the frontend.</Typography>
    </Paper>
  )
}
