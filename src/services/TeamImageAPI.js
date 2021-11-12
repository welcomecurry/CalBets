const TEAMS_API_URL = "https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=";

const generateLink = (team) => {
  var url = TEAMS_API_URL + `${team}`;
  return url;
};

const fetchTeamImage = async (team) => {
  try {
    const data = await fetch(generateLink(team), {
      method: "GET",
    });
    return data.ok && data ? data.json() : [];
  } catch (e) {
    console.log(e);
  }
};

export { fetchTeamImage };
