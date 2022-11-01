import request, { gql } from 'graphql-request'
import { sqlUrl } from '../utils'

const query = gql`
  {
    members(limitArg: 200, sort: AZ) {
      members {
        id
        login
        twitch_id
        display_name
        color
        pfp
        links
      }
      page_info {
        page
        totalPage
      }
    }
  }
`

export const getMembers = () => {
  return request(sqlUrl, query)
}
