import { baseUrl } from './utils'

export const sseEvents = new EventSource(`${baseUrl}/sse?stream=events`)
