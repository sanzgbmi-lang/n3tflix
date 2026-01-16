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

    const link = document.createElement("a");
    link.href = `movie.html?id=${movie.id}&type=movie`;
    link.style.display = "inline-block";

    const img = document.createElement("img");
    img.src = IMG_URL + movie.poster_path;
    img.alt = movie.title;
    img.loading = "lazy";
    img.draggable = false;

    link.appendChild(img);
    container.appendChild(link);
  });
}

/* ================= INIT ================= */

document.addEventListener("DOMContentLoaded", () => {
  loadMoviesHero();
  fetchMovies("/movie/popular", "popular");
  fetchMovies("/movie/top_rated", "topRated");
  fetchMovies("/movie/upcoming", "upcoming");
});
