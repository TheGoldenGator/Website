import request, { gql } from 'graphql-request'
import { sqlUrl } from '../utils'

const query = gql`
  {
    member(search: $search) {
      login
      display_name
      pfp
      links
    }
  }
`

export const getMember = (search: string) => {
  return request(sqlUrl, query.replace('$search', `"${search}"`))
}
