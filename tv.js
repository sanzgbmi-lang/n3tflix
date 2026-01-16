const API_KEY = "5ebfe36c5bbfbd1bdb4f1a9080287aca";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w342";

function goHome() {
  window.location.href = "index.html";
}

async function fetchTV(endpoint, containerId) {
  const res = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}`);
  const data = await res.json();
  const container = document.getElementById(containerId);

  data.results.forEach(show => {
    if (!show.poster_path) return;

    const img = document.createElement("img");
    img.src = IMG_URL + show.poster_path;
    img.alt = show.name;

    img.onclick = () => {
      window.location.href = `movie.html?id=${show.id}&type=tv`;
    };

    container.appendChild(img);
  });
}

fetchTV("/trending/tv/week", "trendingTV");
fetchTV("/tv/popular", "popularTV");
fetchTV("/tv/top_rated", "topRatedTV");
