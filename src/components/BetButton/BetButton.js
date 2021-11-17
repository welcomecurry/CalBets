import { Button } from "@material-ui/core";
import CountUp from "react-countup";
import "./BetButton.css";

const BetButton = (props) => {
  return (
    <div className="button">
        <Button variant="outlined" className="s">
            <CountUp
                start={0.0}
                end={props.odds}
                duration={0.5}
                separator=","
                decimals="2"
            />{" "}
        </Button>
    </div>
  );
};

export { BetButton };
