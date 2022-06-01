import "../../styles/index.css";
import twitchLogo from "../../images/twitch_logo.png";
import twitterLogo from '../../images/twitter_logo.png';
import githubLogo from '../../images/github_logo.png';
import { Container, Typography } from "@mui/material";

function About() {
  return (
    <div className="background">
      <Container maxWidth="sm">
        <Typography variant="h4">About</Typography>
        <div className="description">
          <Typography>This site actively keeps up with The Golden Gator crew on Twitch.</Typography>
          <Typography>This site is still being worked on. I made it just as a side project, and wanted to give back to the crew. :)</Typography>
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
      </Container>
    </div>
  );
}

export default About