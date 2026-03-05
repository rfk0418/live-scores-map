const API_KEY = "YOUR_API_KEY";

const map = L.map("map").setView([39.5, -98.35], 4);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap"
}).addTo(map);
