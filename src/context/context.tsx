import { enqueueSnackbar } from 'notistack'
import { createContext, useContext, useEffect, useReducer } from 'react'
import { getStreams } from '../utils/requests/getStreams'
import { getSettings, initSettings } from '../utils/settings'
import { sseEvents } from '../utils/sse'
import {
  GET_STREAMS,
  STREAM_OFFLINE,
  STREAM_ONLINE,
  VIEWERS,
  CHANNEL_UPDATE,
} from './actions'
import { appReducer } from './reducer'

const initialState: any = {
  streams: [],
  isLoading: true,
  isError: false,
}

export const AppContext = createContext(initialState)

const AppProvider = (props: any) => {
  const settings = getSettings()
  const [appState, appDispatch] = useReducer(appReducer, initialState)

  useEffect(() => {
    // Initialize settings if it doesn't exist
    initSettings()

    const getInitialStreams = async () => {
      const data = await getStreams()
      const foundStreams: Stream[] = []
      const res: StreamGQLRequest = data.streams
      res.streams.forEach((stream) => {
        foundStreams.push(stream)
      })
      appDispatch({ type: GET_STREAMS, payload: foundStreams })
    }
    getInitialStreams()

    sseEvents.onmessage = (e) => {
      const data = JSON.parse(e.data)
      switch (data.event) {
        case 'stream.online':
          const payload: SSEMessageEventDataStreamOnline = data.data
          const newStream: Stream = {
            game: data.stream.game,
            game_id: data.stream.game_id,
            started_at: data.stream.started_at,
            status: data.stream.status,
            id: data.stream.id,
            member: data.member,
            thumbnail: data.stream.thumbnail,
            title: data.stream.title,
            twitch_id: data.stream.twitch_id,
            viewers: data.stream.viewers,
          }
          appDispatch({ type: STREAM_ONLINE, payload: newStream })

          if (settings.alerts_enabled && settings.alerts_stream_online) {
            enqueueSnackbar('', {
              variant: 'reportComplete',
              event: 'stream.online',
              pfp: data.member!.pfp,
              username: payload.broadcaster_user_name,
            })
            return
          }
          return

        case 'stream.offline':
          const payloadOffline: SSEMessageEventDataStreamOffline = data.data
          appDispatch({ type: STREAM_OFFLINE, payload: payloadOffline })

          if (settings.alerts_enabled && settings.alerts_stream_offline) {
            enqueueSnackbar('', {
              variant: 'reportComplete',
              event: 'stream.offline',
              pfp: data.member!.pfp,
              username: payloadOffline.broadcaster_user_name,
            })
            return
          }
          return

        case 'channel.update':
          const pUpdate: SSEMessageEventDataChannelUpdate = data.data
          appDispatch({ type: CHANNEL_UPDATE, payload: pUpdate })
          return

        case 'viewers':
          const vUpdate: SSEMessageEventDataViewers = data.data
          appDispatch({ type: VIEWERS, payload: vUpdate })
          return

        default:
          return null
      }
    }

    sseEvents.onerror = () => {
      sseEvents.close()
    }

    return () => {
      sseEvents.close()
    }
  }, [
    settings.alerts_enabled,
    settings.alerts_stream_offline,
    settings.alerts_stream_online,
  ])

  return (
    <AppContext.Provider value={{ appState, appDispatch }}>
      {props.children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)

export default AppProvider
