import "./index.css";
/* import { ReactComponent as TwitchLogo } from "./twitch.svg"
import { ReactComponent as RedditLogo } from "./reddit.svg"
import { ReactComponent as TwitterLogo } from "./twitter.svg"
 */

/* function SocialLinks(urls: string[]) {
  const socialMedia: any[] = [];
  urls.forEach(url => {
    const te = url.replace(/.+\/\/|www.|\..+/g, "");
    let icon: any = null;
    switch (te) {
      case "reddit":
        icon = <RedditLogo />
        break;

      case "twitch":
        icon = <TwitchLogo />
        break;

      case "twitter":
        icon = <TwitterLogo />
        break;
    }

    if (url !== "") {
      socialMedia.push((
        <div className="social-media-icon">
          <a target="_blank" rel="noopener noreferrer" href={url}>
            <div className="social-media-logo">
              {icon}
            </div>
          </a>
        </div>
      ));
    }
  });

  return socialMedia;
} */

export type StreamerProps = {
  status: "offline" | "online";
  user_id: number;
  user_login: string;
  user_display_name: string;
  user_profile_image_url: string;
  stream_id: number;
  stream_title: string;
  stream_game_id: string;
  stream_game_name: string;
  stream_viewer_count: number;
  stream_thumbnail_url: string;
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
  twitch,
  reddit,
  instagram,
  twitter,
  discord,
  youtube,
  tiktok,
}: StreamerProps) => {
  if (status === "online") {
    return (
      <div className="card">
        <div className="thumbnail">
          <a target="_blank" rel="noopener noreferrer" href={"https://twitch.tv/" + user_login}>
            <img className="thumbnail-image" width="395" height="220" alt="thumbnail" src={stream_thumbnail_url.replace('{width}', '640').replace('{height}', '360')} />
            {/* <span style={{width: "395px", height: "220px", backgroundImage: `url(${stream_thumbnail_url.replace('{width}', '640').replace('{height}', '360')})`}}></span> */}
          </a>
          <p className="viewer-count">{stream_viewer_count} viewers</p>
        </div>
        <div className="footer">
          <p className="title">{stream_title}</p>
          <div className="pfp-username">
            <img className="pfp" alt={user_login + "-pfp"} src={user_profile_image_url} />
            <span className="username">
              {user_display_name}
            </span>
            <span className="game-name">
              {stream_game_name}
            </span>
          </div>
        </div>
      </div>
    );
  }
}