
const needle = document.getElementById("needle");
const statusText = document.getElementById("status");

const KAABA_LAT = 21.4225;
const KAABA_LON = 39.8262;

function toRadians(degrees) {
  return degrees * Math.PI / 180;
}

function toDegrees(radians) {
  return radians * 180 / Math.PI;
}

function calculateBearing(lat1, lon1, lat2, lon2) {
  const φ1 = toRadians(lat1);
  const φ2 = toRadians(lat2);
  const Δλ = toRadians(lon2 - lon1);
  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x = Math.cos(φ1) * Math.sin(φ2) -
            Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  const θ = Math.atan2(y, x);
  return (toDegrees(θ) + 360) % 360;
}

function updateCompass(userLat, userLon) {
  const bearing = calculateBearing(userLat, userLon, KAABA_LAT, KAABA_LON);
  needle.style.transform = `rotate(${bearing}deg)`;
  statusText.textContent = "Qibla direction is shown by the red needle.";
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      updateCompass(lat, lon);
    },
    (err) => {
      statusText.textContent = "Location access denied. Please allow to see Qibla direction.";
    }
  );
} else {
  statusText.textContent = "Geolocation not supported by this browser.";
}
