import {
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Card,
  Grid,
  IconButton,
  Tooltip,
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
import { makeStyles } from '@mui/styles'
import { useState } from 'react'
import ReactGA from 'react-ga'

interface StreamerCardProps {
  index: number
  stream: Stream | null
  multiStreams: string[]
  handleMultiStreamClick: (login: string) => void
  settings: Settings
}

const useStyles = makeStyles({
  root: {
    transition: 'transform 0.15s ease-in-out',
  },
  cardHovered: {
    transform: 'scale3d(1.02, 1.02, 1)',
  },
})

const StreamCard = ({
  index,
  stream,
  multiStreams,
  handleMultiStreamClick,
  settings,
}: StreamerCardProps) => {
  const [state, setState] = useState({
    raised: false,
    shadow: 1,
  })
  const classes = useStyles()

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
      <Grid item xs={4} sm={4} md={6} lg={2} key={1}>
        <Card
          classes={{ root: state.raised ? classes.cardHovered : '' }}
          className={classes.root}
          elevation={2}
          onMouseOver={() => setState({ raised: true, shadow: 3 })}
          onMouseOut={() => setState({ raised: false, shadow: 1 })}
          raised={state.raised}
        >
          {stream !== null ? (
            <Box sx={{ position: 'relative' }}>
              <Link
                target="_blank"
                href={`https://twitch.tv/${stream.member.login}`}
                onClick={() => {
                  ReactGA.event({
                    category: 'Click',
                    action: 'Clicked a stream',
                    label: stream.member.login,
                  })
                }}
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
                      <Stack direction="column">
                        <Stack direction="row" spacing={2}>
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
                        </Stack>

                        <Typography
                          sx={{
                            color: '#bf94ff',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {stream?.game}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid sx={{ marginLeft: 'auto', color: '#bf94ff' }}>
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
                </Grid>
              </Grid>
            </Stack>
          </CardContent>
          <CardActions>
            <SocialLinks
              links={stream!.member.links}
              login={stream!.member.login}
            />
          </CardActions>
        </Card>
      </Grid>
    </Fade>
  )
}

export default StreamCard
