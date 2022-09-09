import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
} from '@mui/material'
import SocialLinks from './SocialLinks'

type MemberCardProps = {
  edge: MemberEdge
}

const MemberCard = ({ edge }: MemberCardProps) => {
  return (
    <Grid item xs={4} sm={3} md={2} lg={1} key={1}>
      <Card elevation={2}>
        <CardMedia
          component="img"
          height="220"
          image={edge.node.pfp}
          alt="green iguana"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="subtitle1"
            component="div"
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {edge.node.display_name}
          </Typography>
          <Typography variant="body1">{edge.node.login}</Typography>
        </CardContent>
        <CardActions sx={{ padding: '0px 8px 8px 8px' }}>
          <SocialLinks links={edge.node.links} login={edge.node.login} />
        </CardActions>
      </Card>
    </Grid>
  )
}
export default MemberCard
