import { useState, useEffect } from "react";
import { CardContent, Typography, Grid, LinearProgress, CircularProgress } from "@mui/material";

import { fetchTeamImage } from "../../services/TeamImageAPI";
import CalBetsLogo from "../../CalBetsLogo.png";

const BetCard = (props) => {
  const [bettedTeamImage, setBettedTeamImage] = useState(CalBetsLogo);
  const [isLive, setIsLive] = useState(props.isLive);
  const [imageLoaded, setImageLoaded] = useState(props.isLive);
  const { gameStartTime, price: betPrice, choice, teamNames, value: betValue, betDate } = props;

  useEffect(async () => {
    const image1 = await fetchTeamImage(teamNames[1]);
    if (image1 && image1.value) 
    {
      setBettedTeamImage(image1.value[0].contentUrl);
      setImageLoaded(true);
    }
  }, []);

  const generateRandomrgbaColor = () => {
    const randomBetween = (min, max) =>
      min + Math.floor(Math.random() * (max - min + 1));
    const r = randomBetween(0, 255);
    const g = randomBetween(0, 255);
    const b = randomBetween(0, 255);
    return `rgba(131, ${r}, ${g}, ${b})`;
  };

  return (
    <div className="container">
      <Grid container justifyContent="center">
        <Grid
          item
          xs={6}
          md={8}
          className={isLive ? "card" : "card card-foot"}
          style={{
            borderBottom: `10px solid ${generateRandomrgbaColor()}`,
          }}
        >
          <CardContent>
            <Typography
                style={{ fontWeight: "bold"}}
                color="textSecondary"
              >
                {`${teamNames[0]} vs ${teamNames[1]}`}
            </Typography>
            <div className="te">
              { imageLoaded ? (<img className="teamBadge" src={bettedTeamImage}></img>) : <CircularProgress /> }
              <div className="row">
                <Typography
                  style={{ fontWeight: "bold" }}
                  color="textPrimary"
                >
                  {teamNames[choice]}: {betPrice}
                </Typography>
                <div>
                  <Typography
                    style={{ fontWeight: "bold", marginBottom: "1rem"}}
                    color="textPrimary"
                  >
                    Amount Bet: {betValue}
                    <Typography
                    style={{ marginBottom: "1rem"}}
                    color="textSecondary"
                    variant="body2"
                  >
                    Win Amount:
                  </Typography>
                </Typography>
              </div>
              </div>
            </div>
            {isLive ? (
              <Typography variant="body2">In Progress</Typography>
            ) : (
              <Typography variant="body2">
                {betDate.toDate().toLocaleString([], {
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
