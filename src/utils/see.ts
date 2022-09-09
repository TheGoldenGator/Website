import { setSetting } from './settings'
import { baseUrl } from './utils'

export let sseEvents = new EventSource(`${baseUrl}/sse?stream=events`)

export const initSSE = () => {
  sseEvents = new EventSource(`${baseUrl}/sse?stream=events`)
}

setSetting('is_connected', true)
