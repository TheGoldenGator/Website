import { AccessTime } from '@mui/icons-material'
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Fade,
  Skeleton,
  Typography,
} from '@mui/material'
import '../../styles/index.css'
import Socials from '../Members/Socials'
import ReactGA from 'react-ga';

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
) => {
  console.log('Test')
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

  const loading = false
  return (
    <Fade
      in={loaded}
      style={{ transformOrigin: '0 0 0' }}
      {...(loaded ? { timeout: Math.floor(ind * 150) } : {})}
    >
      <div className="stream-card">
        <Card sx={{ maxWidth: 400 }}>
          <div className="thumbnail" onClick={() => {
            ReactGA.event({
              category: 'Click',
              action: "Clicked stream",
              label: user_login
            });
          }}>
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
          <CardContent sx={{padding: '8px'}}>
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
                  {loading ? <Skeleton variant="text" /> : user_display_name}
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
          <CardActions sx={{padding: '0px 8px 8px 8px'}}>
            <Socials
              discord={discord}
              instagram={instagram}
              reddit={reddit}
              tiktok={tiktok}
              twitter={twitter}
              vrchat_legends={vrchat_legends}
              youtube={youtube}
            />
          </CardActions>
        </Card>
      </div>
    </Fade>
  )
}
