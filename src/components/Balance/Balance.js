import { Card, CardHeader, Avatar, Grid } from "@mui/material";
import { red } from "@mui/material/colors";

const Balance = (props) => {
  const { value } = props;
  return (
    <Grid container spacing={0} justifyContent="center">
      <Grid item component={Card} xs={12} md={2} className="">
        <Card>
          <CardHeader
            avatar={
              <Avatar sx={{ backgroundColor: "#FDB515" }} aria-label="recipe">
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
