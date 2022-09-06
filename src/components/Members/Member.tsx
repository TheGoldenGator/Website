import { Box, Paper, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMember } from '../../utils/requests/getMember'

const Member = () => {
  const [member, setMember] = useState<Member | null>(null)
  let { memberId } = useParams()

  useEffect(() => {
    if (memberId) {
      getMember(memberId).then((data) => {
        const res: Member = data.member
        setMember(res)
      })
    }
  }, [memberId])

  return (
    <Box>
      <Paper elevation={5} sx={{ padding: 3 }}>
        <Stack direction="column" spacing={1}>
          <img
            style={{ width: 124, height: 124 }}
            alt="pfp"
            src={member?.pfp}
          />
          <Typography variant="h5">{member?.display_name}</Typography>
        </Stack>
      </Paper>
    </Box>
  )
}

export default Member
