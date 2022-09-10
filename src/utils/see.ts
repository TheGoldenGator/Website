import { setSetting } from './settings'
import { baseUrl } from './utils'

export const sseEvents = new EventSource(`${baseUrl}/sse?stream=events`)

setSetting('is_connected', true)
