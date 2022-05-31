import { useEffect, useState } from "react";
import { StreamerCard, StreamerProps } from "../../components/StreamerCard";
import "./index.css";

function Home() {
  setInterval(() => {
    window.location.reload();
  }, 300000); // 5 mins

  const [streams, setStreams] = useState<StreamerProps[]>();
  useEffect(() => {
    fetch("https://api.thegoldengator.tv/streams?status=online")
      .then((response) => response.json())
      .then((json) => setStreams(json.data))
  }, []);

  return (
    <div className="background">
        <div className="stream-cards">
          <div className="cards">
            {streams &&
              streams.map((item) => (
                StreamerCard(item)
              ))}
          </div>
        </div>
    </div>
  );
}

export default Home;