import React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import CountUp from 'react-countup';
import "./GameCard.css";

const GameCard = (props) => {
    // if() {
    //     return 'Loading...';
    // }
    return (
        <div className="container">
            <Grid container spacing={4} justify="center">
                <Grid item component={Card} xs={12} md={2} className="card foot">
                    <CardContent>
                        <Typography variant="body2" gutterBottom>{props.title}</Typography>
                        <Typography variant="body2">
                        </Typography>
                        <Typography color="textSecondary">{props.teamOneName + " "} <CountUp start={0.0} end={props.teamOneOdds} duration={0.5} separator="," decimals="2"/> </Typography>
                        <Typography color="textSecondary">{props.teamTwoName + " "} <CountUp start={0.0} end={props.teamTwoOdds} duration={0.5} separator="," decimals="2"/> </Typography>
                        <Typography variant="body2">{props.time}</Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    )
}

export { GameCard };