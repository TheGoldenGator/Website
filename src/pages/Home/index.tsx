import { useEffect, useState } from "react";
import { StreamerCard, StreamerProps } from "../../components/StreamerCard";
import "./index.css";
import Logo from "./The_Golden_Gator_Logo.png";

function Home() {
  const [streams, setStreams] = useState<StreamerProps[]>();
  useEffect(() => {
    fetch("http://localhost:8000/streams")
      .then((response) => response.json())
      .then((json) => setStreams(json.data))
  }, []);

  return (
    <div className="background">
      <div className="header">
        <img className="logo" src={Logo} alt="logo" />
        <div className="header-right">
          <a className="active" href="#home">Home</a>
          <a href="#contact">Contact</a>
          <a href="#about">About</a>
        </div>
      </div>
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