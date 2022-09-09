import request, { gql } from 'graphql-request'
import { sqlUrl } from '../utils'

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
  return request(sqlUrl, query.replace('$search', `"${search}"`))
}
