const API_KEY = "5ebfe36c5bbfbd1bdb4f1a9080287aca";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

/* ================= HERO ================= */
const HERO_ENDPOINT = "/trending/movie/week";
let heroMovies = [];
let heroIndex = 0;

async function loadHero() {
    const res = await fetch(`${BASE_URL}${HERO_ENDPOINT}?api_key=${API_KEY}`);
    const data = await res.json();

    heroMovies = data.results.filter(m => m.backdrop_path && m.poster_path);
    if (!heroMovies.length) return;

    updateHero();

    if (window.innerWidth >= 768) {
        setInterval(updateHero, 5000);
    }
}

function updateHero() {
    const movie = heroMovies[heroIndex];
    const hero = document.getElementById("hero");

    document.getElementById("hero-title").textContent =
        movie.title || movie.name || "";

    document.getElementById("hero-desc").textContent =
        movie.overview || "";

    const imagePath =
        window.innerWidth < 768 ? movie.poster_path : movie.backdrop_path;

    hero.style.backgroundImage =
        `url(${IMG_URL.replace("w500", "original")}${imagePath})`;

    heroIndex = (heroIndex + 1) % heroMovies.length;
}

/* ================= ROWS ================= */
async function fetchMovies(endpoint, id) {
    const res = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}`);
    const data = await res.json();
    const container = document.getElementById(id);
    if (!container) return;

    container.innerHTML = "";

    data.results.forEach(movie => {
        if (!movie.poster_path || !movie.id) return;

        const type = movie.title ? "movie" : "tv";

        // 🔑 CREATE ANCHOR (THIS IS THE KEY)
        const link = document.createElement("a");
        link.href = `movie.html?id=${movie.id}&type=${type}`;
        link.style.display = "inline-block";
        link.style.textDecoration = "none";

        const img = document.createElement("img");
        img.src = IMG_URL + movie.poster_path;
        img.alt = movie.title || movie.name;
        img.draggable = false;

        link.appendChild(img);
        container.appendChild(link);
    });
}



/* ================= SCROLL REVEAL ================= */
function revealRows() {
    const rows = document.querySelectorAll(".row");
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        }, { threshold: 0.2 }
    );
    rows.forEach(row => observer.observe(row));
}

/* ================= INIT ================= */
document.addEventListener("DOMContentLoaded", () => {
    loadHero();

    fetchMovies("/trending/movie/week", "trending");
    fetchMovies("/movie/popular", "popular");
    fetchMovies("/movie/top_rated", "topRated");
    fetchMovies("/movie/upcoming", "upcoming");
    fetchMovies("/trending/tv/week", "tv");

    revealRows();
});