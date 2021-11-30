import { Card, CardHeader, Avatar, Grid } from "@mui/material";
import { red } from "@mui/material/colors";

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
