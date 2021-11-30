import { useState, useEffect } from "react";

import {
  Card,
  CardContent,
  Typography,
  Grid,
  LinearProgress,
  Button
} from "@mui/material";


import { fetchTeamImage } from "../services/TeamImageAPI";
import CalBetsLogo from "../CalBetsLogo.png";

const ResultCard = (props) => {
  const [homeTeamImage, setTeamOneImage] = useState(CalBetsLogo);
  const [awayTeamImage, setTeamTwoImage] = useState(CalBetsLogo);
  const [isLive, setIsLive] = useState(props.isLive);
  const { db, key: gameId, leagueName, homeTeam, awayTeam } =
    props;

  // useEffect(async () => {
  //   const image1 = await fetchTeamImage(homeTeam.name);
  //   const image2 = await fetchTeamImage(awayTeam.name);

  //   if (image1 && image1.teams) setTeamOneImage(image1.teams[0].strTeamBadge);
  //   if (image2 && image2.teams) setTeamTwoImage(image2.teams[0].strTeamBadge);
  // }, []);

  return (
    <div className="container">
      <Grid container justifyContent="center">
        <Grid
          item
          xs={6}
          md={8}
          component={Card}
          className={isLive ? "card" : "card card-foot"}
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
                  {homeTeam.name}
                </Typography>
                <Button variant="contained">{homeTeam.score}</Button>
              </div>
            </div>
            <div className="te">
              <img className="teamBadge" src={awayTeamImage}></img>
              <div className="row">
                <Typography
                  style={{ fontWeight: "bold" }}
                  color="textSecondary"
                >
                  {awayTeam.name}
                </Typography>
                <Button variant="contained">{awayTeam.score}</Button>
              </div>
            </div>
            {isLive ? (
              <Typography variant="body2">In Progress</Typography>
            ) : (
              <Typography variant="body2">Finished</Typography>
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

export { ResultCard };
