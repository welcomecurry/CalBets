const CORS_URL = "https://cors-anywhere.herokuapp.com/";

// OddsAPI
//Xavi's Key 06165585a2b227eef55bc7ab4fc056a3
//Amit's Key 4766c767e8fd0fc9d14849e3ad1aac29
const ODDS_API_KEY = "4740754f9d2b0542ac89e94e1368fc0f"; 
const ODDS_API_URL = "https://api.the-odds-api.com/v4/sports/";

const generateLink = (sport, params) => {
  var url = ODDS_API_URL + `${sport}/odds/?apiKey=${ODDS_API_KEY}`;
  Object.entries(params).forEach(([key, value]) => {
    url += `&${key}=${value}`;
  });

  return url;
};

const fetchOdds = async (
  sport,
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
