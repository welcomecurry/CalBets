//Old API
// const TEAMS_API_URL = "https://www.thesportsdb.com/api/v1/json/2/searchteams.php?t=";
// const generateLink = (team) => {
//   var url = TEAMS_API_URL + `${team}`;
//   return url;
// };

const fetchTeamImage = async (team) => {
  try {
    const data = await fetch(`https://api.bing.microsoft.com/v7.0/images/search?q=${team} badge`, {
      "method": "GET",
      "headers": {
        'Ocp-Apim-Subscription-Key': '26ebbbc7b7c344a9b85f9cbeef43bc91',
        "Accept": "application/json"      
      }
    });
    return data.ok && data ? data.json() : [];
  } catch (e) {
    console.log(e);
  }
};

export { fetchTeamImage };
