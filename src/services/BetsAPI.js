const CORS_URL = "https://cors-anywhere.herokuapp.com/";

// OddsAPI
const ODDS_API_KEY = "06165585a2b227eef55bc7ab4fc056a3";
const ODDS_API_URL = "https://api.the-odds-api.com/v4/sports/";

const generateLink = (sport, params) => {
  var url = ODDS_API_URL + `${sport}/odds/?apiKey=${ODDS_API_KEY}`;
  Object.entries(params).forEach(([key, value]) => {
    url += `&${key}=${value}`;
  });

  return url;
};

const fetchOdds = async (
  sport = "upcoming",
  params = { regions: "us", markets: "h2h" }
) => {
  try {
    const data = await fetch(generateLink(sport, params), {
      method: "GET",
    });
    return data.ok && data ? data.json() : [];
  } catch (e) {
    console.log(e);
  }
};

export { fetchOdds };
