const API_KEY = "5ebfe36c5bbfbd1bdb4f1a9080287aca";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/original";

// Get URL params
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const type = params.get("type"); // movie or tv

async function loadDetails() {
  const res = await fetch(
    `${BASE_URL}/${type}/${id}?api_key=${API_KEY}`
  );
  const data = await res.json();

  // Set background
  document.getElementById("details-hero").style.backgroundImage =
    `url(${IMG_URL}${data.backdrop_path})`;

  // Poster
  document.getElementById("details-poster").src =
    IMG_URL + data.poster_path;

  // Title
  document.getElementById("details-title").textContent =
    data.title || data.name;

  // Meta info
  document.getElementById("details-meta").textContent =
    `⭐ ${data.vote_average} • ${
      data.release_date || data.first_air_date
    } • ${
      data.runtime
        ? data.runtime + " min"
        : data.episode_run_time?.[0] + " min"
    }`;

  // Genres
  const genresEl = document.getElementById("details-genres");
  data.genres.forEach(g => {
    const span = document.createElement("span");
    span.textContent = g.name;
    genresEl.appendChild(span);
  });

  // Overview
  document.getElementById("details-overview").textContent =
    data.overview;
}

loadDetails();
