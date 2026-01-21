/* ================= FEATURED TV HERO ================= */

async function loadTVHero() {
  try {
    const res = await fetch(
      `${BASE_URL}/trending/tv/week?api_key=${API_KEY}`
    );
    const data = await res.json();

    const show = data.results.find(s => s.backdrop_path);
    if (!show) return;

    const hero = document.getElementById("tv-hero");
    const title = document.getElementById("tv-hero-title");
    const desc = document.getElementById("tv-hero-desc");

    title.textContent = show.name;
    desc.textContent = show.overview;

    const imgBase =
      window.innerWidth < 768 ? HERO_IMG_MOBILE : HERO_IMG_DESKTOP;

    hero.style.backgroundImage =
      `url(${imgBase}${show.backdrop_path})`;
  } catch (err) {
    console.error("TV hero error:", err);
  }
}

/* ================= TV ROWS ================= */

async function fetchTV(endpoint, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";

  const res = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}`);
  const data = await res.json();

  data.results.forEach(show => {
    if (!show.poster_path) return;

    // card
    const card = document.createElement("a");
    card.href = `movie.html?id=${show.id}&type=tv`;
    card.className = "poster-card";

    // poster
    const img = document.createElement("img");
    img.src = IMG_URL + show.poster_path;
    img.alt = show.name;
    img.loading = "lazy";
    img.draggable = false;

    // title
    const title = document.createElement("div");
    title.className = "poster-title";
    title.textContent = show.name;

    // year
    const year = document.createElement("div");
    year.className = "poster-year";
    year.textContent = show.first_air_date
      ? show.first_air_date.split("-")[0]
      : "";

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(year);

    container.appendChild(card);
  });
}

/* ================= INIT ================= */

document.addEventListener("DOMContentLoaded", () => {
  loadTVHero();

  fetchTV("/trending/tv/week", "trendingTV");
  fetchTV("/tv/popular", "popularTV");
  fetchTV("/tv/top_rated", "topRatedTV");
});
