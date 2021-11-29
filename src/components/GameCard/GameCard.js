import { useState, useEffect } from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import LinearProgress from "@mui/material/LinearProgress";

import { BetButton } from "../BetButton/BetButton";
import { fetchTeamImage } from "../../services/TeamImageAPI";
import CalBetsLogo from "../../CalBetsLogo.png";

import {
  setGame,
  updateUserBalance,
  setUserBet,
} from "../../utils/firebaseFunctions";

const GameCard = (props) => {
  const [teamOneImage, setTeamOneImage] = useState(CalBetsLogo);
  const [teamTwoImage, setTeamTwoImage] = useState(CalBetsLogo);
  const [isLive, setIsLive] = useState(props.isLive);
  const { db, gameId, leagueName, gameStartTime, userId, teamOne, teamTwo } =
    props;

  useEffect(async () => {
    const image1 = await fetchTeamImage(teamOne.name);
    const image2 = await fetchTeamImage(teamTwo.name);

    if (image1 && image1.teams) setTeamOneImage(image1.teams[0].strTeamBadge);
    if (image2 && image2.teams) setTeamTwoImage(image2.teams[0].strTeamBadge);
  }, []);

  const handlePlaceBet = async (price, value) => {
    const game = { id: gameId, teamOne: teamOne.name, teamTwo: teamTwo.name };
    await setGame(db, game);
    await setUserBet(db, userId, gameId, price, value);
    await updateUserBalance(db, userId, value);
  };

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
              <img className="teamBadge" src={teamOneImage}></img>
              <div className="row">
                <Typography
                  style={{ fontWeight: "bold" }}
                  color="textSecondary"
                >
                  {teamOne.name}
                </Typography>
                <BetButton
                  teamName={teamOne.name}
                  teamImage={teamOneImage}
                  price={teamOne.price}
                  handlePlaceBet={handlePlaceBet}
                />
              </div>
            </div>
            <div className="te">
              <img className="teamBadge" src={teamTwoImage}></img>
              <div className="row">
                <Typography
                  style={{ fontWeight: "bold" }}
                  color="textSecondary"
                >
                  {teamTwo.name}
                </Typography>
                <BetButton
                  teamName={teamTwo.name}
                  teamImage={teamTwoImage}
                  price={teamTwo.price}
                  handlePlaceBet={handlePlaceBet}
                />
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

export { GameCard };
