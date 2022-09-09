import {
  Box,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControlLabel,
  FormGroup,
  Stack,
  Switch,
  Typography,
} from '@mui/material'
import { Container } from '@mui/system'
import { getSettings, setSetting } from '../../utils/settings'
import { useEffect, useState } from 'react'
import ReactGA from 'react-ga'

const Settings = () => {
  const [settings, setSettings] = useState<Settings>(
    JSON.parse(localStorage.getItem('settings')!),
  )

  useEffect(() => {
    document.title = 'Golden Gator | Settings'
    ReactGA.pageview('settings')

    let settings = getSettings()
    setSettings(settings)
  }, [])

  useEffect(() => {
    window.addEventListener('storage', () => {})
  }, [])

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <DialogTitle variant="h4" sx={{ fontWeight: 'bold' }}>
          Settings
        </DialogTitle>
      </Box>

      <Divider />

      <DialogContent>
        <Stack spacing={1}>
          <DialogContentText variant="h6" sx={{ color: 'white' }}>
            General
          </DialogContentText>
          <FormControlLabel
            control={<Switch checked={settings.twitch_color_names} />}
            label="Twitch chat color usernames"
            onChange={(event: any) => {
              setSettings({
                ...settings,
                twitch_color_names: !settings.twitch_color_names,
              })
              setSetting('twitch_color_names', !settings.twitch_color_names)
            }}
          />
          {/* <Divider />
          <DialogContentText variant="h6" sx={{ color: 'white' }}>
            Updates
          </DialogContentText>
          <DialogContentText>
            Disabling auto updates makes the page refresh every 5 minutes rather
            then live updating the site. This does not disable alerts.
          </DialogContentText>
          <FormGroup>
            <FormControlLabel
              control={<Switch checked={settings.live_updates_enabled} />}
              label="Live updates"
              onChange={(event: any) => {
                const toggle = !settings.live_updates_enabled
                setSettings({
                  ...settings,
                  live_updates_enabled: toggle,
                })
                setSetting('live_updates_enabled', toggle)
              }}
            />
          </FormGroup> */}
        </Stack>
        <Divider sx={{ marginTop: 1, marginBottom: 1 }} />
        <Stack spacing={1}>
          <FormGroup>
            <DialogContentText variant="h6" sx={{ color: 'white' }}>
              Alerts
            </DialogContentText>
            <FormControlLabel
              control={<Switch checked={settings.alerts_enabled} />}
              label="Enabled"
              onChange={(event: any) => {
                const toggle = !settings.alerts_enabled
                setSettings({
                  ...settings,
                  alerts_enabled: toggle,
                })
                setSetting('alerts_enabled', toggle)
              }}
            />
            <DialogContentText>
              What type of alerts would you like to recieve?
            </DialogContentText>

            <FormControlLabel
              control={<Switch checked={settings.alerts_stream_online} />}
              label="Streamer goes live"
              disabled={!settings.alerts_enabled}
              onChange={(event: any) => {
                const toggle = !settings.alerts_stream_online
                setSettings({
                  ...settings,
                  alerts_stream_online: toggle,
                })
                setSetting('alerts_stream_online', toggle)
              }}
            />
            <FormControlLabel
              control={<Switch checked={settings.alerts_stream_offline} />}
              label="Streamer goes offline"
              disabled={!settings.alerts_enabled}
              onChange={(event: any) => {
                const toggle = !settings.alerts_stream_offline
                setSettings({
                  ...settings,
                  alerts_stream_offline: toggle,
                })
                setSetting('alerts_stream_offline', toggle)
              }}
            />
            <FormControlLabel
              control={<Switch checked={settings.alerts_stream_title_change} />}
              label="Streamer changed title of their stream"
              disabled={!settings.alerts_enabled}
              onChange={(event: any) => {
                const toggle = !settings.alerts_stream_title_change
                setSettings({
                  ...settings,
                  alerts_stream_title_change: toggle,
                })
                setSetting('alerts_stream_title_change', toggle)
              }}
            />
            <FormControlLabel
              control={<Switch checked={settings.alerts_stream_game_change} />}
              label="Streamer changed games"
              disabled={!settings.alerts_enabled}
              onChange={(event: any) => {
                const toggle = !settings.alerts_stream_game_change
                setSettings({
                  ...settings,
                  alerts_stream_game_change: toggle,
                })
                setSetting('alerts_stream_game_change', toggle)
              }}
            />
          </FormGroup>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Typography sx={{ fontStyle: 'italic', padding: 1 }}>
          Settings save as they are changed
        </Typography>
      </DialogActions>
    </Container>
  )
}

export default Settings
