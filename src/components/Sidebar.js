import { useState, useEffect } from "react";
import Button from "@mui/material/Button";

const Sidebar = (props) => {
  const odds = props.odds;

  // hook for unique list of sport titles
  const [uniqueLeagues, setUniqueLeagues] = useState([]);
  // get unique list of sports titles
  useEffect(() => {
    const items = odds;
    const uniqueLeaguesSet = new Set(["all"]);

    for (const item of items) {
      uniqueLeaguesSet.add(item.sport_title);
    }
    setUniqueLeagues(Array.from(uniqueLeaguesSet));
  }, [odds]);

  // hook for filtered display
  const [filteredOdds, setFilteredOdds] = useState(odds);
  // filter the "odds" data to only have the relevant sport
  // this function handles clicks
  function handleClick(e) {
    e.preventDefault();
    const clicked = e.target.id;
    if (clicked == "all") {
      return setFilteredOdds(odds);
    } else {
      const filtered = odds.filter(function (item) {
        return item.sport_title == clicked;
      });

      setFilteredOdds(filtered);
    }
  }

  // return sidebar element
  return (
    <div title="sidebar">
      <div>
        {uniqueLeagues.map((u) => (
          <Button
            sx={{ m: 0.5, backgroundColor: "secondary.light" }}
            variant="contained"
            id={u}
            key={u}
            onClick={handleClick}
          >
            {u}
          </Button>
        ))}
      </div>
    </div>
  );
};

export { Sidebar };
