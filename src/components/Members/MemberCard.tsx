import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Grow,
} from '@mui/material'
import '../../styles/index.css'

export interface MemberProps {
  id: number
  display_name: string
  login: string
  profile_image_url: string
  twitch: string
  reddit: string
  instagram: string
  twitter: string
  discord: string
  youtube: string
  tiktok: string
  vrchat_legends: string
}

export const MemberCard = (
  {
    id,
    display_name,
    login,
    profile_image_url,
    twitch,
    reddit,
    twitter,
    instagram,
    discord,
    youtube,
    tiktok,
    vrchat_legends,
  }: MemberProps,
  loaded: boolean,
  index: number,
) => {
  return (
    <Grow
      in={loaded}
      style={{ transformOrigin: '0 0 0' }}
      {...(loaded ? { timeout: Math.floor(index * 100) } : {})}
    >
      <div className="stream-card">
        <Card sx={{ maxWidth: 345, minHeight: 250 }}>
          <Avatar
            alt=""
            src={profile_image_url
              .replace('{width}', '64')
              .replace('{height}', '64')}
            sx={{
              width: 64,
              height: 64,
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: '15px',
            }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {display_name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </Card>
      </div>
    </Grow>
  )
}
