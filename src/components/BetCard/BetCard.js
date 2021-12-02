import { useState, useEffect } from "react";
import { Timestamp } from "firebase/firestore";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  LinearProgress,
} from "@mui/material";

import { BetButton } from "../BetButton/BetButton";
// import { fetchTeamImage } from "../../services/TeamImageAPI";
import CalBetsLogo from "../../CalBetsLogo.png";

const BetCard = (props) => {
  const [homeTeamImage, setTeamOneImage] = useState(CalBetsLogo);
  const [awayTeamImage, setTeamTwoImage] = useState(CalBetsLogo);
  const [isLive, setIsLive] = useState(props.isLive);
  const { db, key: gameId, leagueName, gameStartTime, userId, homeTeam, awayTeam } =
    props;

  // useEffect(async () => {
  //   const image1 = await fetchTeamImage(homeTeam.name);
  //   const image2 = await fetchTeamImage(awayTeam.name);

  //   if (image1 && image1.teams) setTeamOneImage(image1.teams[0].strTeamBadge);
  //   if (image2 && image2.teams) setTeamTwoImage(image2.teams[0].strTeamBadge);
  // }, []);
  const generateRandomrgbaColor = () => {
    const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
    const r = randomBetween(0, 255);
    const g = randomBetween(0, 255);
    const b = randomBetween(0, 255);
    return `rgba(131, ${r}, ${g}, ${b})`;
  }

  return (
    <div className="container">
      <Grid container justifyContent="center">
        <Grid
          item
          xs={6}
          md={8}
          className={isLive ? "card" : "card card-foot"}
          style={{
            borderBottom: `10px solid ${generateRandomrgbaColor()}`
           }}
        >
          <CardContent>
            <Typography
              variant="body2"
              style={{ fontWeight: "bold" }}
              gutterBottom
            >
              {leagueName}
            </Typography>
            <Typography variant="body2"></Typography>
            <div className="te">
              <img className="teamBadge" src={homeTeamImage}></img>
              <div className="row">
                <Typography
                  style={{ fontWeight: "bold" }}
                  color="textSecondary"
                >
                  {"bettedTeam.name"}
                </Typography>
              </div>
            </div>
            <div className="te">
              <div className="row">
                <Typography
                  style={{ fontWeight: "bold", justifyContent: "center" }}
                  color="textSecondary"
                >
                  {"homeTeam.name vs awayTeam.name"}
                </Typography>
                <Typography
                  style={{ fontWeight: "bold", justifyContent: "center" }}
                  color="textSecondary"
                >
                  {"odds / amount bet"}
                </Typography>
              </div>
            </div>
            {isLive ? (
              <Typography variant="body2">In Progress</Typography>
            ) : (
              <Typography variant="body2">
                {new Date(gameStartTime).toLocaleString([], {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Typography>
            )}
          </CardContent>
          {isLive && (
            <LinearProgress
              sx={{
                height: "10px",
              }}
              color="primary"
            />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export { BetCard };
