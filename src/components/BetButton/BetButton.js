import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import { Button, Menu, MenuItem, TextField } from "@mui/material";
import CountUp from "react-countup";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const BetButton = (props) => {
  const { teamName, teamImage, price, choice, handlePlaceBet } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [betValue, setBetValue] = useState("");
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls="demo-customized-menu"
        aria-haspopup="true"
        aria-expanded={open}
        variant="contained"
        disableElevation
        onClick={handleClick}
      >
        <CountUp
          start={0.0}
          end={price}
          duration={1.3}
          separator=","
          decimals="2"
          />
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem sx={{ width: "25rem" }}>
          <img className="teamBadge" src={teamImage}></img>
          {teamName + " " + price}
        </MenuItem>
        <div className="field">
          <MenuItem disableRipple>
            <TextField
              id="outlined-basic"
              label="Bet Amount"
              variant="outlined"
              type="number"
              value={betValue}
              onChange={(e) => setBetValue(e.target.value)}
            />
            <Button
              disabled={betValue.length == 0 || parseFloat(betValue) <= 0}
              onClick={(e) => {
                e.preventDefault();
                handlePlaceBet(parseFloat(betValue), choice);
                handleClose();
              }}
            >
              Bet
            </Button>
          </MenuItem>
        </div>
      </StyledMenu>
    </div>
  );
};

export { BetButton };
