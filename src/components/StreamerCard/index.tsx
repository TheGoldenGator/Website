import "./index.css";

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
  stream_thumbnail_url
}: StreamerProps) => {
  if (status === "online") {
    return (
      <div className="card">
        <div className="thumbnail">
          <img width="340" height="186" alt="thumbnail" src={stream_thumbnail_url.replace('{width}', '640').replace('{height}', '360')} />
          <p className="viewer-count">{stream_viewer_count} viewers</p>
        </div>
        <div className="footer">
          <p className="title">{stream_title}</p>

          <div className="pfp-username">
            <img className="pfp" alt={user_login + "-pfp"} src={user_profile_image_url} />
            <span className="username">
              {user_display_name}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
