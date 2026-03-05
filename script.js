const API_KEY = "bf7b52a8-b4de-40bf-bf89-0b4fc699306c";

const map = L.map("map").setView([39.5, -98.35], 4);

const starPlayers = {
  "Los Angeles Lakers": "lebron.png",
  "Denver Nuggets": "jokic.png"
};

L.tileLayer(
'https://tiles.wmflabs.org/bw-dark/{z}/{x}/{y}.png',
{
  attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
  subdomains: 'abcd',
  maxZoom: 19
}).addTo(map);

function playerIcon(image) {
  return L.icon({
    iconUrl: `players/${image}`,
    iconSize: [50,50],
    iconAnchor: [25,25],
    popupAnchor: [0,-25]
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

    const offset = 2.2;

    const homeStar = starPlayers[homeTeam];
    const visitorStar = starPlayers[visitorTeam];

    const popup = `
      <b>${visitorTeam}</b> ${game.visitor_team_score}<br>
      <b>${homeTeam}</b> ${game.home_team_score}<br><br>
      Status: ${game.status}
    `;

    // visitor player (left)
    if (visitorStar) {
      L.marker([location[0], location[1] - offset], { icon: playerIcon(visitorStar) })
        .addTo(map)
        .bindPopup(popup);
    }

    // home player (right)
    if (homeStar) {
      L.marker([location[0], location[1] + offset], { icon: playerIcon(homeStar) })
        .addTo(map)
        .bindPopup(popup);
    }

  });

}

getGames();

setInterval(() => {
  location.reload();
}, 60000);
