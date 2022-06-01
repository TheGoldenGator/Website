import { AccessTime } from "@mui/icons-material";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import "../../styles/index.css"

export type StreamerProps = {
  status: "offline" | "online";
  user_id: string;
  user_login: string;
  user_display_name: string;
  user_profile_image_url: string;
  stream_id: string;
  stream_title: string;
  stream_game_id: string;
  stream_game_name: string;
  stream_viewer_count: string;
  stream_thumbnail_url: string;
  stream_started_at: string;
  twitch: string;
  reddit: string;
  instagram: string;
  twitter: string;
  discord: string;
  youtube: string;
  tiktok: string;
}

export const StreamerCard = ({
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
  reddit,
  instagram,
  twitter,
  discord,
  youtube,
  tiktok,
}: StreamerProps) => {
  const parseDate = (date: string) => {
    const now = new Date().getTime();
    const parse = new Date(date).getTime();
    const diff = now - parse;

    const hours = Math.floor(diff / 3.6e6);
    const minutes = Math.floor((diff % 3.6e6) / 6e4);

    return `${(hours < 10 ? '0' : '') + hours}:${(minutes < 10 ? '0' : '') + minutes}`;
  }
  if (status === "online") {
    return (
      <>
        <a target="_blank" rel="noopener noreferrer" href={"https://twitch.tv/" + user_login}>
          <Card sx={{ maxWidth: 400 }}>
            <div className="thumbnail">
              <a target="_blank" rel="noopener noreferrer" href={"https://twitch.tv/" + user_login}>
                <CardMedia
                  component="img"
                  height="220"
                  image={stream_thumbnail_url.replace('{width}', '420').replace('{height}', '220')}
                  alt=""
                />
              </a>
              <div className="uptime">
                <AccessTime fontSize="medium" />
                <span>{parseDate(stream_started_at)}</span>
              </div>
              {/* <p className="uptime"><AccessTime ></AccessTime></p> */}
              <p className="viewer-count">{stream_viewer_count} viewers</p>
            </div>
            <CardContent>
              <Typography variant="body1" color="text.secondary">
                <p className="title"><abbr title={stream_title}>{stream_title}</abbr></p>
              </Typography>
              <Typography variant="body2" align="left">
                <div className="pfp-username">
                  <img className="pfp" alt='' src={user_profile_image_url} />
                  <span className="username">
                    {user_display_name}
                  </span>
                  <span className="game-name">
                    {stream_game_name}
                  </span>
                </div>
              </Typography>
            </CardContent>
          </Card >
        </a>
      </>
    );
  }
}