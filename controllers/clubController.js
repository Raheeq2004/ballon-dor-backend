const axios = require("axios");

const getFeaturedClubs = async (req, res) => {
  try {
    const clubNames = [
      "Real Madrid",
      "Barcelona",
      "Liverpool",
      "Manchester City",
      "Inter Miami",
      "Bayern Munich",
    ];

    const responses = await Promise.all(
      clubNames.map((club) =>
        axios.get(
          `https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${club}`
        )
      )
    );

    const clubs = responses
      .map((response) => response.data.teams?.[0])
      .filter(Boolean);

   const formattedClubs = clubs.map((club) => ({
  name: club.strTeam,
  league: club.strLeague,
  country: club.strCountry,
  stadium: club.strStadium,
  badge: club.strBadge || club.strTeamBadge,
}));

res.json(formattedClubs);

  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      message: "Failed to fetch club data",
    });
  }
};

module.exports = {
  getFeaturedClubs,
};