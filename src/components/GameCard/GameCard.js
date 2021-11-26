import { useState, useEffect } from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import LinearProgress from '@mui/material/LinearProgress';
import CountUp from "react-countup";
import { BetButton } from "../BetButton/BetButton"
import { fetchTeamImage } from "../../services/TeamImageAPI";
import CalBetsLogo from "../../CalBetsLogo.png";
import "./GameCard.css";

const GameCard = (props) => {
  // if() {
  //     return 'Loading...';
  // }
  const [teamOneImage, setTeamOneImage] = useState(CalBetsLogo);
  const [teamTwoImage, setTeamTwoImage] = useState(CalBetsLogo);
  const [isLive, setIsLive] = useState(props.isLive);

  useEffect(async () => {
    const image1 = await fetchTeamImage(props.teamOneName);
    const image2 = await fetchTeamImage(props.teamTwoName);

    if (image1 && image1.teams) setTeamOneImage(image1.teams[0].strTeamBadge);
    if (image2 && image2.teams) setTeamTwoImage(image2.teams[0].strTeamBadge);
  }, []);

  return (
    <div className="container">
      <Grid container spacing={4} justifyContent="center">
        <Grid item component={Card} xs={12} md={2} className={isLive ? "card" : "card foot"}>
          <CardContent>
            <Typography variant="body2" gutterBottom>
              {props.title}
            </Typography>
            <Typography variant="body2"></Typography>
            <div className="te">
              <img className="teamBadge" src={teamOneImage}></img>
              <Typography color="textSecondary">
                {props.teamOneName + " "}{" "}

              </Typography>
              <BetButton
                odds={props.teamOneOdds}
                team={props.teamOneName}
                image={teamOneImage}
              />
            </div>
            <div className="te">
              <img className="teamBadge" src={teamTwoImage}></img>
              <Typography color="textSecondary">
                {props.teamTwoName + " "}{" "}
              <BetButton
                odds={props.teamTwoOdds}
                team={props.teamTwoName}
                image={teamTwoImage}
              />
              </Typography>
            </div>
            <Typography variant="body2">
              {new Date(props.time).toLocaleString([], {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Typography>
          </CardContent>
          {isLive ? (
            <div className="t">
          <LinearProgress 
          sx={{
          width: 300,
          height: 8,
          borderRadius: 1,
          right: 18,
          top: 16,
        }} color="primary" />
        </div>) : (null)}
        </Grid>
      </Grid>
    </div>
  );
};

export { GameCard };
