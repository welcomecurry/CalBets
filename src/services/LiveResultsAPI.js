const LIVE_RESULTS_API_URL =
  "https://livescore6.p.rapidapi.com/matches/v2/list-live?";

const fetchLiveResults = async (sport) => {
  try {
    const data = await fetch(LIVE_RESULTS_API_URL + `Category=${sport}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "livescore6.p.rapidapi.com",
        "x-rapidapi-key": "86a8bc0f76msh56b1240912c3977p10d883jsnc92d89aadc2e",
      },
    });

    return data.ok && data ? data.json() : [];
  } catch (e) {
    console.log(e);
  }
};

export { fetchLiveResults };
