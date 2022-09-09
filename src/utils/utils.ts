// Determines the envrionment the site should run in
export const inProduction: boolean = true

// URls project uses.
export const sqlUrl = !inProduction
  ? 'http://localhost:8000/query'
  : 'https://api.thegoldengator.tv/query'
export const baseUrl = !inProduction
  ? 'http://localhost:8000'
  : 'https://thegoldengator.tv'

// Get the decimal separator that is used by the browser
export const whatDecimalSeparator = () => {
  let n: string | number = 1.1
  n = n.toLocaleString().substring(1, 2)
  return n
}

export const formatNumber = (num: number) => {
  return num.toLocaleString()
}

// Sorts streams by viewcount
export const sortByViewcount = (
  order: 'ascending' | 'descending',
  streams: Stream[],
) => {
  switch (order) {
    case 'ascending':
      return streams.sort((a, b) => {
        return a.viewers - b.viewers
      })
    case 'descending':
      return streams.sort((a, b) => {
        return b.viewers - a.viewers
      })
    default:
      return streams
  }
}

export const filterArray = (array: any, filters: any) => {
  const filterKeys = Object.keys(filters)
  return array.filter((item: any) => {
    // validates all filter criteria
    return filterKeys.every((key) => {
      // ignores non-function predicates
      if (typeof filters[key] !== 'function') return true
      return filters[key](item[key])
    })
  })
}
