import "./index.css";
import githubLogo from "./imgs/github-logo.png";
import twitchLogo from "./imgs/twitch-logo.png";
import twitterLogo from "./imgs/twitter-logo.png";

function About() {
  return (
    <div className="background">
      <main>
        <h1>About</h1>
      </main>
      <div className="description">
        <p>This site actively keeps up with The Golden Gator crew on Twitch.</p>
        <p>This site is still being worked on. I made it just as a side project, and wanted to give back to the crew. :)</p>
      </div>

      <div className="about-footer">
        <br></br>
        <i style={{ marginTop: "80px" }}>Am I missing data, streams, or have any ideas? Feel free to reach out in any way below.</i>
        <div className="contact" style={{ marginTop: "40px" }}>
          <a href="https://github.com/Mahcks" target="_blank" rel="noreferrer">
            <img src={githubLogo} style={{ width: "64px", height: "64px", filter: "brightness(0) invert(1)" }} loading="lazy" alt="Github" />
          </a>
          <a href="https://www.twitch.tv/mahcksimus" target="_blank" rel="noreferrer">
            <img src={twitchLogo} style={{ width: "55px", height: "64px", marginLeft: "75px" }} loading="lazy" alt="Twitch" />
          </a>
          <a href="https://www.twitter.com/mahcksimus" target="_blank" rel="noreferrer">
            <img src={twitterLogo} style={{ width: "75px", height: "64px", marginLeft: "75px" }} loading="lazy" alt="Twitter" />
          </a>
          <p style={{ color: "white", marginTop: "25px", fontWeight: "bold" }}>Mahcks#0001 on Discord</p>
          <br />
        </div>
      </div>
    </div>
  );
}

export default About