export const sseEvents = new EventSource(
  'http://localhost:8080/sse?stream=events',
  {
    withCredentials: false,
  },
)
