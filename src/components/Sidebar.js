import { useState, useEffect } from "react";
import Button from "@mui/material/Button";

const Sidebar = (props) => {
  const { odds, selectedLeague, setSelectedLeague } = props;

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

  function handleClick(e) {
    e.preventDefault();
    setSelectedLeague(e.target.id);
  }

  // return sidebar element
  return (
    <div title="sidebar">
      <div>
        {uniqueLeagues.map((u) => (
          <Button
            sx={{
              m: 0.5,
              backgroundColor:
                u === selectedLeague ? "secondary.dark" : "secondary.light",
            }}
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
