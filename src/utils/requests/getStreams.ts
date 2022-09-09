import request, { gql } from 'graphql-request'
import { sqlUrl } from '../utils'

const query = gql`
  {
    streams(limitArg: 100, pageArg: 1, status: ONLINE) {
      streams {
        member {
          login
          display_name
          twitch_id
          color
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
        status
        title
        game
        viewers
        thumbnail
        started_at
      }
      page_info {
        page
        totalPage
      }
    }
  }
`

export const getStreams = () => {
  return request(sqlUrl, query)
}
