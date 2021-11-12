import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import CountUp from "react-countup";
import { fetchTeamImage } from "../../services/TeamImageAPI";
import CalBetsLogo from "../../CalBetsLogo.png";
import "./GameCard.css";

const GameCard = (props) => {
  // if() {
  //     return 'Loading...';
  // }
  const [teamOneImage, setTeamOneImage] = useState(CalBetsLogo);
  const [teamTwoImage, setTeamTwoImage] = useState(CalBetsLogo);

  useEffect(async () => {
    const image1 = await fetchTeamImage(props.teamOneName);
    const image2 = await fetchTeamImage(props.teamTwoName);

    if (image1 && image1.teams) setTeamOneImage(image1.teams[0].strTeamBadge);
    if (image2 && image2.teams) setTeamTwoImage(image2.teams[0].strTeamBadge);
  }, []);

  return (
    <div className="container">
      <Grid container spacing={4} justifyContent="center">
        <Grid item component={Card} xs={12} md={2} className="card foot">
          <CardContent>
            <Typography variant="body2" gutterBottom>
              {props.title}
            </Typography>
            <Typography variant="body2"></Typography>
            <div className="te">
              <img className="teamBadge" src={teamOneImage}></img>
              <Typography color="textSecondary">
                {props.teamOneName + " "}{" "}
                <CountUp
                  start={0.0}
                  end={props.teamOneOdds}
                  duration={0.5}
                  separator=","
                  decimals="2"
                />{" "}
              </Typography>
            </div>
            <div className="te">
              <img className="teamBadge" src={teamTwoImage}></img>
              <Typography color="textSecondary">
                {props.teamTwoName + " "}{" "}
                <CountUp
                  start={0.0}
                  end={props.teamTwoOdds}
                  duration={0.5}
                  separator=","
                  decimals="2"
                />{" "}
              </Typography>
            </div>
            <Typography variant="body2">{new Date(props.time).toLocaleString()}</Typography>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  );
};

export { GameCard };
