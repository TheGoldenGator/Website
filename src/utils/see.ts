import { setSetting } from './settings'
import { baseUrl } from './utils'

export const sseEvents = new EventSource(`${baseUrl}/sse`)

sseEvents.addEventListener('open', (e) => {
  setSetting('is_connected', true)
})
