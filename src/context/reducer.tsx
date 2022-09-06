import { enqueueSnackbar } from 'notistack'
import { getSettings } from '../utils/settings'
import { sortByViewcount } from '../utils/utils'
import {
  GET_STREAMS,
  STREAM_OFFLINE,
  STREAM_ONLINE,
  VIEWERS,
  CHANNEL_UPDATE,
} from './actions'

export const appReducer = (state: any, action: any) => {
  if (action.type === GET_STREAMS) {
    return {
      ...state,
      streams: action.payload,
      isLoading: false,
      isError: false,
    }
  } else if (action.type === STREAM_ONLINE) {
    const appendedStream = sortByViewcount('descending', [
      action.payload,
      ...state.streams,
    ])
    return { ...state, streams: appendedStream }
  } else if (action.type === STREAM_OFFLINE) {
    return {
      ...state,
      streams: state.streams.filter(
        (v: Stream) =>
          v.member.twitch_id !== action.payload.broadcaster_user_id,
      ),
    }
  } else if (action.type === VIEWERS) {
    // Get all current streams
    const { streams } = state
    const newStreams: Stream[] = []
    const old = streams
    old.forEach((s: any) => {
      // Loop through and check if any of the stream twitch_ids match with the payload sent
      if (action.payload[s.member.twitch_id] !== undefined) {
        // If it does then update the viewcount with the new value
        s.viewers = action.payload[s.member.twitch_id]
      }

      newStreams.push(s)
    })

    return {
      ...state,
      streams: newStreams,
    }
  } else if (action.type === CHANNEL_UPDATE) {
    const settings = getSettings()
    const { streams } = state
    const oldStreams = streams as Stream[]
    const streamIndex = oldStreams.findIndex(
      (s: Stream) => s.member.twitch_id === action.payload.broadcaster_user_id,
    )

    const found = oldStreams[streamIndex]
    if (found === undefined)
      return {
        ...state,
      }

    if (
      found.game.toLowerCase() !== action.payload.category_name.toLowerCase()
    ) {
      if (settings.alerts_enabled && settings.alerts_stream_game_change) {
        enqueueSnackbar(action.payload.category_name, {
          variant: 'reportComplete',
          event: 'game.update',
          pfp: found.member.pfp,
          username: found.member.display_name,
        })
      }

      found.game = action.payload.category_name
    }

    if (found.title.toLowerCase() !== action.payload.title.toLowerCase()) {
      if (settings.alerts_enabled && settings.alerts_stream_title_change) {
        enqueueSnackbar(action.payload.title, {
          variant: 'reportComplete',
          event: 'title.update',
          pfp: found.member.pfp,
          username: found.member.display_name,
        })
      }

      found.title = action.payload.title
    }

    return {
      ...state,
      streams: oldStreams,
    }
  }
}
