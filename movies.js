/* ================= FEATURED MOVIE HERO ================= */

async function loadMoviesHero() {
  try {
    const res = await fetch(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
    );
    const data = await res.json();

    const movie = data.results.find(m => m.backdrop_path);
    if (!movie) return;

    const hero = document.getElementById("movies-hero");
    const title = document.getElementById("movies-hero-title");
    const desc = document.getElementById("movies-hero-desc");

    title.textContent = movie.title;
    desc.textContent = movie.overview;

    const imgBase =
      window.innerWidth < 768 ? HERO_IMG_MOBILE : HERO_IMG_DESKTOP;

    hero.style.backgroundImage =
      `url(${imgBase}${movie.backdrop_path})`;
  } catch (err) {
    console.error("Movies hero error:", err);
  }
}

/* ================= MOVIE ROWS ================= */

async function fetchMovies(endpoint, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";

  const res = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}`);
  const data = await res.json();

  data.results.forEach(movie => {
    if (!movie.poster_path) return;

    // ===== card wrapper =====
    const card = document.createElement("a");
    card.href = `movie.html?id=${movie.id}&type=movie`;
    card.className = "poster-card";

    // ===== poster =====
    const img = document.createElement("img");
    img.src = IMG_URL + movie.poster_path;
    img.alt = movie.title;
    img.loading = "lazy";
    img.draggable = false;

    // ===== title =====
    const title = document.createElement("div");
    title.className = "poster-title";
    title.textContent = movie.title;

    // ===== year =====
    const year = document.createElement("div");
    year.className = "poster-year";
    year.textContent = movie.release_date
      ? movie.release_date.split("-")[0]
      : "";

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(year);

    container.appendChild(card);
  });
}

/* ================= INIT ================= */

document.addEventListener("DOMContentLoaded", () => {
  loadMoviesHero();
  fetchMovies("/movie/popular", "popular");
  fetchMovies("/movie/top_rated", "topRated");
  fetchMovies("/movie/upcoming", "upcoming");
});
