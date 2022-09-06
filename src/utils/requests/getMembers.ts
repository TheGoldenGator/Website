import request, { gql } from 'graphql-request'

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
      page_info {
        page
        totalPage
      }
    }
  }
`

export const getMembers = () => {
  return request('http://localhost:8080/query', query)
}
