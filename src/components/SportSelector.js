import { Button } from "@mui/material";

const SportSelector = (props) => {
  const { sports, selectedSport, setSelectedSport } = props;

  const handleClick = (e) => {
    e.preventDefault();
    setSelectedSport(e.target.id);
  };

  // return sidebar element
  return (
    <div title="sidebar">
      <div>
        {sports &&
          Object.entries(sports).map(([ind, sport]) => (
            <Button
              sx={{
                m: 0.5,
                backgroundColor:
                  sport === selectedSport
                    ? "secondary.dark"
                    : "secondary.light",
              }}
              variant="contained"
              id={sport}
              key={sport}
              onClick={handleClick}
            >
              {sport}
            </Button>
          ))}
      </div>
    </div>
  );
};

export { SportSelector };
