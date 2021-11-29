import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";

import { red } from "@mui/material/colors";
import { Grid } from "@material-ui/core";

const Balance = (props) => {
  const { value } = props;
  return (
    <Grid container spacing={0} justifyContent="center">
      <Grid item component={Card} xs={12} md={3} className="">
        <Card sx={{}}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                ₿
              </Avatar>
            }
            title="Balance"
            subheader={`${value} ₿TC`}
          />
        </Card>
      </Grid>
    </Grid>
  );
};

export { Balance };
