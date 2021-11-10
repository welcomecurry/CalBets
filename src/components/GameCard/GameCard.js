import React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
//import CountUp from 'react-countup';
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
                        <Typography color="textSecondary" gutterBottom>Title</Typography>
                        <Typography variant="h5">
                            {/* <CountUp start={0} end={1000} duration={2.5} separator=","/> */}
                        </Typography>
                        <Typography color="textSecondary">Teams</Typography>
                        <Typography variant="body2">Date</Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    )
}

export { GameCard };