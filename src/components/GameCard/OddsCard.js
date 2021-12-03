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
import { fetchTeamImage } from "../../services/TeamImageAPI";
import CalBetsLogo from "../../CalBetsLogo.png";

import {
  setGame,
  createUserBet,
  updateUserBalance,
} from "../../utils/firebaseFunctions";

const OddsCard = (props) => {
  const [homeTeamImage, setTeamOneImage] = useState(CalBetsLogo);
  const [awayTeamImage, setTeamTwoImage] = useState(CalBetsLogo);
  const [isLive, setIsLive] = useState(props.isLive);
  const { db, gameId, leagueName, gameStartTime, userId, homeTeam, awayTeam } =
    props;
    
  useEffect(async () => {
    const image1 = await fetchTeamImage(homeTeam.name);
    const image2 = await fetchTeamImage(awayTeam.name);

    if (image1 && image1.value) setTeamOneImage(image1.value[0].contentUrl);
    if (image2 && image2.value) setTeamTwoImage(image2.value[0].contentUrl);
  }, []);

  const generateRandomrgbaColor = () => {
    const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
    const r = randomBetween(0, 255);
    const g = randomBetween(0, 255);
    const b = randomBetween(0, 255);
    return `rgba(131, ${r}, ${g}, ${b})`;
  }

  const handlePlaceBet = async (price, value, choice) => {
    const game = {
      teams: [homeTeam.name, awayTeam.name],
      date: Timestamp.fromDate(new Date(gameStartTime)),
    };
    await setGame(db, gameId, game);
    await createUserBet(db, userId, gameId, price, value, choice);
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
                  {homeTeam.name}
                </Typography>
                <BetButton
                  teamName={homeTeam.name}
                  teamImage={homeTeamImage}
                  price={homeTeam.price}
                  choice={0}
                  handlePlaceBet={handlePlaceBet}
                />
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
                <BetButton
                  teamName={awayTeam.name}
                  teamImage={awayTeamImage}
                  price={awayTeam.price}
                  choice={1}
                  handlePlaceBet={handlePlaceBet}
                />
              </div>
            </div>
            {isLive ? (
              <Typography variant="body2">In Progress</Typography>
            ) : (
              <Typography variant="body2">
                {new Date(gameStartTime + "Z").toLocaleString([], {
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

export { OddsCard };
