declare module '*.gif'
declare module '*.webp'
declare module '*.png'

type StreamGQLRequest = {
  streams: Stream[]
  page_info?: {
    total?: number
    page?: number
    perPage?: number
    prev?: number
    next?: number
    totalPage?: number
  }
}

type MemberGQLRequest = {
  members: Member[]
  page_info?: {
    total?: number
    page?: number
    perPage?: number
    prev?: number
    next?: number
    totalPage?: number
  }
}

type Stream = {
  id: string
  twitch_id: string
  member: Member
  status: StreamStatus
  title: string
  game_id: string
  game: string
  viewers: number
  thumbnail: string
  started_at: string
}

type MemberEdge = {
  cursor: string
  node: Member
}

type StreamStatus = 'ONLINE' | 'OFFLINE' | 'ALL'

type Member = {
  id: string
  twitch_id: string
  login: string
  display_name: string
  color: string
  pfp: string
  links: string[]
}

/* SSE */
type SSEChannel = 'events'
type SSEMessageEvent =
  | 'stream.online'
  | 'stream.offline'
  | 'channel.update'
  | 'viewers'

type SSEMessage = {
  event: SSEMessageEvent
  member?: Member
  stream?: Stream
  data: any
}

// SSEMessageEvent = stream.online
type SSEMessageEventDataStreamOnline = {
  id: string
  broadcaster_user_id: string
  broadcaster_user_login: string
  broadcaster_user_name: string
  type: string
  started_at: string
}

// SSEMessageEvent = stream.offline
type SSEMessageEventDataStreamOffline = {
  broadcaster_user_id: string
  broadcaster_user_login: string
  broadcaster_user_name: string
}

// SSEMessageEvent = channel.update
type SSEMessageEventDataChannelUpdate = {
  broadcaster_user_id: string
  broadcaster_user_login: string
  broadcaster_user_name: string
  title: string
  language: string
  category_id: string
  category_name: string
  is_mature: boolean
}

type SSEMessageEventDataViewers = Map<string, number>

type StreamEvent = 'stream.online' | 'stream.offline' | 'channel.update'

/* Settings */
type Settings = {
  live_updates_enabled: boolean
  alerts_enabled: boolean
  alerts_stream_online: boolean
  alerts_stream_offline: boolean
  alerts_stream_title_change: boolean
  alerts_stream_game_change: boolean
  twitch_color_names: boolean
  viewer_sort: 'descending' | 'ascending'
  is_connected: boolean
}

type SettingCategories = 'updates' | 'alerts'

/* Stats */
type StatEntry = {
  twitch_id?: string
  rank?: number
  minutes_streamed?: number
  avg_viewers?: number
  max_viewers?: number
  hours_watched?: number
  followers?: number
  views?: number
  followers_total?: number
  views_total?: number
}
