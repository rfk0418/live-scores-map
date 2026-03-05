const API_KEY = "YOUR_API_KEY";

const map = L.map("map").setView([39.5, -98.35], 4);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap"
}).addTo(map);

async function getGames() {

  const today = new Date().toLocaleDateString("en-CA");

  const response = await fetch(
    `https://api.balldontlie.io/v1/games?dates[]=${today}`,
    {
      headers: { Authorization: API_KEY }
    }
  );

  const data = await response.json();

  displayGames(data.data);
}

function displayGames(games) {

  games.forEach(game => {

    const homeTeam = game.home_team.full_name;
    const visitorTeam = game.visitor_team.full_name;

    const location = teamLocations[homeTeam];

    if (!location) return;

    const marker = L.marker(location).addTo(map);

    marker.bindPopup(`
      <b>${visitorTeam}</b> ${game.visitor_team_score}<br>
      <b>${homeTeam}</b> ${game.home_team_score}<br><br>
      Status: ${game.status}
    `);
  });
}

getGames();

setInterval(() => {
  location.reload();
}, 60000);
