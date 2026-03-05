const API_KEY = "bf7b52a8-b4de-40bf-bf89-0b4fc699306c";

const map = L.map("map").setView([39.5, -98.35], 4);

const starPlayers = {
  LAL: "lebron.png",
  GSW: "curry.png",
  BOS: "tatum.png",
  DEN: "jokic.png"
};

const offset = 0.15; // degrees

L.tileLayer(
'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
{
  attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
  subdomains: 'abcd',
  maxZoom: 19
}).addTo(map);

function playerIcon(playerImage) {

  return L.icon({
    iconUrl: `players/${playerImage}`,
    iconSize: [48,48],
    iconAnchor: [24,24],
    popupAnchor: [0,-20]
  });

}

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
