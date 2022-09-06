// Creates default settings if they don't have any in local storage
export const initSettings = () => {
  const stored = localStorage.getItem('settings')
  if (stored === null) {
    const settings: Settings = {
      alerts_enabled: true,
      alerts_stream_game_change: false,
      alerts_stream_offline: false,
      alerts_stream_online: true,
      alerts_stream_title_change: false,
      live_updates_enabled: true,
      twitch_color_names: true,
      viewer_sort: 'descending',
    }

    localStorage.setItem('settings', JSON.stringify(settings))
  }
}

export const getSettings = () => {
  const settings = localStorage.getItem('settings')
  if (settings === null) {
    return {
      alerts_enabled: true,
      alerts_stream_game_change: false,
      alerts_stream_offline: false,
      alerts_stream_online: true,
      alerts_stream_title_change: false,
      live_updates_enabled: true,
      twitch_color_names: true,
      viewer_sort: 'descending',
    } as Settings
  }

  return JSON.parse(settings) as Settings
}

export const setSetting = (setting: string, value: any) => {
  const settings = getSettings()
  if (settings !== null) {
    let data: any = settings
    data = {
      ...data,
      [setting]: value,
    }
    localStorage.setItem('settings', JSON.stringify(data))
  }
}
