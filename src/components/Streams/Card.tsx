import {
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Card,
  Grid,
  IconButton,
  Tooltip,
  Divider,
  Link,
  Fade,
  Skeleton,
  Box,
  Avatar,
} from '@mui/material'
import { Stack } from '@mui/system'
import { AccessTime } from '@mui/icons-material'
import SocialLinks from '../Members/SocialLinks'
import AppsIcon from '@mui/icons-material/Apps'
import { getSettings } from '../../utils/settings'

interface StreamerCardProps {
  index: number
  stream: Stream | null
  multiStreams: string[]
  handleMultiStreamClick: (login: string) => void
}

const StreamCard = ({
  index,
  stream,
  multiStreams,
  handleMultiStreamClick,
}: StreamerCardProps) => {
  const settings = getSettings()
  const parseDate = (date: string) => {
    const now = new Date().getTime()
    const parse = Date.parse(date)
    const diff = now - parse

    const hours = Math.floor(diff / 3.6e6)
    const minutes = Math.floor((diff % 3.6e6) / 6e4)

    return `${(hours < 10 ? '0' : '') + hours}:${
      (minutes < 10 ? '0' : '') + minutes
    }`
  }

  return (
    <Fade
      in={true}
      style={{ transformOrigin: '0 0 0' }}
      {...(true ? { timeout: Math.floor(index * 150) } : {})}
    >
      <Grid item xs={4} sm={4} md={3} key={1}>
        <Card elevation={2}>
          {stream !== null ? (
            <Box sx={{ position: 'relative' }}>
              <Link
                target="_blank"
                href={`https://twitch.tv/${stream.member.login}`}
              >
                <CardMedia
                  component="img"
                  height="220"
                  image={stream.thumbnail
                    .replace('{width}', '420')
                    .replace('{height}', '220')}
                  alt=""
                  sx={{ position: 'relative' }}
                />
                <p className="viewer-count">{stream.viewers} viewers</p>
                <div className="uptime">
                  <AccessTime
                    fontSize="small"
                    sx={{
                      marginRight: '3px',
                      fontSize: '18px',
                    }}
                  />
                  <Typography>{parseDate(stream.started_at)}</Typography>
                </div>
                {/* <div className="thumbnail-live">
                  <span>LIVE</span>
                </div> */}
              </Link>
            </Box>
          ) : (
            <Skeleton width={420} height={220} />
          )}

          <CardContent>
            <Tooltip title={stream!.title}>
              {stream !== undefined ? (
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
                  <strong>{stream?.title}</strong>
                </Typography>
              ) : (
                <Skeleton />
              )}
            </Tooltip>

            <Stack direction="row" spacing={1}>
              <Grid container alignItems="center">
                <Grid>
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    spacing={1}
                  >
                    <Grid item>
                      <Avatar
                        sx={{ width: 42, height: 42, borderRadius: '50%' }}
                        alt={stream?.member.login}
                        src={stream?.member.pfp}
                      />
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="body1"
                        sx={{
                          color: settings.twitch_color_names
                            ? stream?.member.color
                            : '#ffffff',
                        }}
                      >
                        <strong>{stream?.member.display_name}</strong>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid sx={{ marginLeft: 'auto', color: '#bf94ff' }}>
                  <Typography>{stream?.game}</Typography>
                </Grid>
              </Grid>
            </Stack>
          </CardContent>
          <CardActions sx={{ padding: '0px 8px 8px 8px' }}>
            <Stack direction="row">
              <Tooltip title="Add to Multi-Stream">
                <IconButton
                  sx={{
                    color: multiStreams.includes(stream!.member.login)
                      ? '#b6995b'
                      : 'rgb(119, 119, 119)',
                  }}
                  onClick={() => {
                    handleMultiStreamClick(stream!.member.login)
                  }}
                >
                  <AppsIcon />
                </IconButton>
              </Tooltip>
              <Divider />
              <SocialLinks links={stream!.member.links} />
            </Stack>
          </CardActions>
        </Card>
      </Grid>
    </Fade>
  )
}

export default StreamCard
