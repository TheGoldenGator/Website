import request, { gql } from 'graphql-request'

const query = gql`
  {
    member(search: $search) {
      login
      display_name
      pfp
      links {
        twitch
        reddit
        instagram
        twitter
        discord
        youtube
        tiktok
        vrchat_legends
      }
    }
  }
`

export const getMember = (search: string) => {
  return request('http://localhost:8080/query', query.replace('$search', `"${search}"`))
}
