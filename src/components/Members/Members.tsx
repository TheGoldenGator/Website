import { Box } from '@mui/material'
import { Container } from '@mui/system'
import { useEffect, useState } from 'react'
import ViewTable from './ViewTable'
import { getMembers } from '../../utils/requests/getMembers'
import ReactGA from 'react-ga'

const Members = () => {
  const [members, setMembers] = useState<MemberGQLRequest | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    document.title = 'Golden Gator | Members'
    ReactGA.pageview('members')

    getMembers().then((data) => {
      const res: MemberGQLRequest = data.members
      setMembers(res)
      setLoading(true)
    })
  }, [])

  return (
    <Container>
      <Box>
        <ViewTable members={members} loading={loading} />
      </Box>
    </Container>
  )
}

export default Members
