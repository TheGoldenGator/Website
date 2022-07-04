import { AccessTime } from '@mui/icons-material'
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Fade,
  IconButton,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import '../../styles/index.css'
import Socials from '../Members/Socials'

export type StreamerProps = {
  status: 'offline' | 'online'
  user_id: string
  user_login: string
  user_display_name: string
  user_profile_image_url: string
  stream_id: string
  stream_title: string
  stream_game_id: string
  stream_game_name: string
  stream_viewer_count: string
  stream_thumbnail_url: string
  stream_started_at: string
  twitch: string
  vrchat_legends: string
  reddit: string
  instagram: string
  twitter: string
  discord: string
  youtube: string
  tiktok: string
}

export const StreamerCard = (
  {
    status,
    user_id,
    user_login,
    user_display_name,
    user_profile_image_url,
    stream_id,
    stream_title,
    stream_game_id,
    stream_game_name,
    stream_viewer_count,
    stream_thumbnail_url,
    stream_started_at,
    twitch,
    vrchat_legends,
    reddit,
    instagram,
    twitter,
    discord,
    youtube,
    tiktok,
  }: StreamerProps,
  loaded: boolean,
  ind: number,
  vrcStreamsOnly: boolean,
) => {
  const parseDate = (date: string) => {
    const now = new Date().getTime()
    const parse = new Date(date).getTime()
    const diff = now - parse

    const hours = Math.floor(diff / 3.6e6)
    const minutes = Math.floor((diff % 3.6e6) / 6e4)

    return `${(hours < 10 ? '0' : '') + hours}:${
      (minutes < 10 ? '0' : '') + minutes
    }`
  }

  // Displays streams that are only in VRChat
  if (vrcStreamsOnly && stream_game_name !== 'VRChat') return

  const addStreamToMultiview = () => {
    const currentStreams = JSON.parse(localStorage.getItem('multiview')!)

    // Removes streamer to multiview selection
    if (currentStreams.includes(user_login)) {
      const ind = currentStreams.indexOf(user_login)
      currentStreams.splice(ind, 1)
      localStorage.setItem('multiview', JSON.stringify(currentStreams))
    } else {
      // Adds streamer to multiview selection
      const curr = JSON.parse(localStorage.getItem('multiview')!)
      curr.push(user_login)
      localStorage.setItem('multiview', JSON.stringify(curr))
    }
  }

  const inMultiviewSelection = () => {
    const currentStreams = JSON.parse(localStorage.getItem('multiview')!);

    if (currentStreams.includes(user_login)) {
      console.log('should be on')
      return true
    } else {
      console.log('should be off')
      return false
    }
  }

  const loading = false
  return (
    <Fade
      in={loaded}
      style={{ transformOrigin: '0 0 0' }}
      {...(loaded ? { timeout: Math.floor(ind * 150) } : {})}
    >
      <div className="stream-card">
        <Card sx={{ maxWidth: 400 }}>
          <div className="thumbnail">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={'https://twitch.tv/' + user_login}
            >
              <CardMedia
                component="img"
                height="220"
                image={stream_thumbnail_url
                  .replace('{width}', '420')
                  .replace('{height}', '220')}
                alt=""
              />
            </a>
            {status === 'online' ? (
              <div className="thumbnail-live">
                <span>LIVE</span>
              </div>
            ) : (
              <></>
            )}
            {status === 'online' ? (
              <div className="uptime">
                <AccessTime
                  fontSize="small"
                  sx={{
                    marginRight: '3px',
                    marginTop: '2px',
                    fontSize: '18px',
                  }}
                />
                <p>{parseDate(stream_started_at)}</p>
              </div>
            ) : (
              <></>
            )}
            {status === 'online' ? (
              <p className="viewer-count">{stream_viewer_count} viewers</p>
            ) : (
              <></>
            )}
          </div>
          <CardContent sx={{ padding: '8px' }}>
            <Typography variant="body1" color="text.secondary">
              {loading ? (
                <Skeleton variant="text" />
              ) : (
                <p className="title">
                  <abbr title={stream_title}>{stream_title}</abbr>
                </p>
              )}
            </Typography>
            <Typography variant="body2" align="left">
              <div className="pfp-username">
                {loading ? (
                  <Skeleton variant="circular" width={40} height={35} />
                ) : (
                  <img className="pfp" alt="" src={user_profile_image_url} />
                )}
                <span className="username">
                  {loading ? <Skeleton variant="text" /> : (user_login === "aikasanvr") ? <>{user_display_name}<br />{user_login}</> : user_display_name}
                </span>
                <span className="game-name">
                  {loading ? (
                    <Skeleton variant="text" />
                  ) : (
                    <abbr title={stream_game_name}>{stream_game_name}</abbr>
                  )}
                </span>
              </div>
            </Typography>
          </CardContent>
          <CardActions sx={{ padding: '0px 8px 8px 8px' }}>
            <Tooltip title="Add to Multiview">
              <IconButton
                size="small"
                color="primary"
                sx={{ margin: '0 6px 0 6px' }}
                onClick={addStreamToMultiview}
              >
                <svg
                  className={(inMultiviewSelection) ? 'multiview-button' : 'multiview-button-selected'}
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18 13.496h-4.501v4.484h-3v-4.484H6v-2.99h4.5V6.021h3.001v4.485H18v2.99zM21 .041H3C1.348.043.008 1.379 0 3.031v17.94c.008 1.65 1.348 2.986 3 2.988h18c1.651-.002 2.991-1.338 3-2.988V3.031c-.009-1.652-1.348-2.987-3-2.99z" />
                </svg>
              </IconButton>
            </Tooltip>

            <Stack direction="row">
              <Socials
                discord={discord}
                instagram={instagram}
                reddit={reddit}
                tiktok={tiktok}
                twitter={twitter}
                vrchat_legends={vrchat_legends}
                youtube={youtube}
              />
            </Stack>
          </CardActions>
        </Card>
      </div>
    </Fade>
  )
}
