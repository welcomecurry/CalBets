const API_KEY = "71e0811c-517e-11ec-89ba-0ae9bc51dafd";

const BASE_URL = "https://jsonodds.com/api";

const performGetRequest = async (url) => {
  const res = await fetch(url, {
    headers: {
      "x-api-key": API_KEY,
    },
  });
  return res.json();
};

const getOdds = () => {
  return performGetRequest(`${BASE_URL}/odds`);
};

const getOddFormats = () => {
  return performGetRequest(`${BASE_URL}/oddformat`);
};

const getSports = () => {
  return performGetRequest(`${BASE_URL}/sports`);
};

const getOddsBySport = (sport) => {
  return performGetRequest(`${BASE_URL}/odds/${sport}`);
};

const getOddTypes = () => {
  return performGetRequest(`${BASE_URL}/oddtype`);
};

const getFinalTypes = () => {
  return performGetRequest(`${BASE_URL}/finaltype`);
};

const getResults = () => {
  return performGetRequest(`${BASE_URL}/results`);
};

const getResultsBySport = (sport) => {
  return performGetRequest(`${BASE_URL}/results/${sport}`);
};

const getResultsByEventId = (eventId) => {
  return performGetRequest(`${BASE_URL}/results/${eventId}`);
};

const getResultsByMatches = async (gamesRequest) => {
  const res = await fetch(`${BASE_URL}/results/bymatches`, {
    method: "POST",
    body: gamesRequest,
    headers: {
      "x-api-key": API_KEY,
    },
  });

  return res.json();
};

const getOddsByMatches = (gamesRequest) => {
  const res = fetch(`${BASE_URL}/odds/bygames`, {
    method: "POST",
    body: gamesRequest,
    headers: {
      "x-api-key": API_KEY,
    },
  })
  return res.json();
};

export {
  getFinalTypes,
  getSports,
  getOddFormats,
  getOdds,
  getOddsBySport,
  getOddTypes,
  getOddsByMatches,
  getResults,
  getResultsBySport,
  getResultsByEventId,
  getResultsByMatches,
};
