const API_KEY = "5ebfe36c5bbfbd1bdb4f1a9080287aca";
const BASE_URL = "https://api.themoviedb.org/3";

// Optimized image sizes
const BACKDROP_DESKTOP = "https://image.tmdb.org/t/p/w1280";
const BACKDROP_MOBILE = "https://image.tmdb.org/t/p/w780";
const POSTER_URL = "https://image.tmdb.org/t/p/w342";

// URL params
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const type = params.get("type");

// Elements (initialized later safely)
let modal, iframe, playBtn, closeBtn;

document.addEventListener("DOMContentLoaded", () => {
    modal = document.getElementById("trailer-modal");
    iframe = document.getElementById("trailer-frame");
    playBtn = document.getElementById("play-trailer");
    closeBtn = document.getElementById("trailer-close");

    if (playBtn) playBtn.addEventListener("click", openTrailer);
    if (closeBtn) closeBtn.addEventListener("click", closeTrailer);

    if (modal) {
        modal.addEventListener("click", e => {
            if (e.target === modal) closeTrailer();
        });
    }

    document.addEventListener("keydown", e => {
        if (e.key === "Escape") closeTrailer();
    });

    loadDetails();
});

async function loadDetails() {
    const res = await fetch(`${BASE_URL}/${type}/${id}?api_key=${API_KEY}`);
    const data = await res.json();

    const hero = document.getElementById("details-hero");
    const poster = document.getElementById("details-poster");

    // Loading state
    hero.classList.add("loading");

    // Title
    document.getElementById("details-title").textContent =
        data.title || data.name;

    // Meta
    document.getElementById("details-meta").textContent =
        `⭐ ${data.vote_average} • ${
      data.release_date || data.first_air_date || ""
    }`;

    // Genres
    const genresEl = document.getElementById("details-genres");
    genresEl.innerHTML = "";
    data.genres.forEach(g => {
        const span = document.createElement("span");
        span.textContent = g.name;
        genresEl.appendChild(span);
    });

    // Overview
    document.getElementById("details-overview").textContent =
        data.overview || "No description available.";

    // Choose backdrop size
    const backdropBase =
        window.innerWidth < 768 ? BACKDROP_MOBILE : BACKDROP_DESKTOP;

    // Preload backdrop
    const bgImg = new Image();
    bgImg.src = `${backdropBase}${data.backdrop_path}`;

    bgImg.onload = () => {
        hero.style.backgroundImage = `url(${bgImg.src})`;
        hero.classList.remove("loading");
        hero.classList.add("loaded");
    };

    // Poster
    poster.loading = "lazy";
    poster.src = POSTER_URL + data.poster_path;
}

async function openTrailer() {
    if (!modal || !iframe) return;

    const res = await fetch(
        `${BASE_URL}/${type}/${id}/videos?api_key=${API_KEY}`
    );
    const data = await res.json();

    // Prefer Trailer → fallback to Teaser
    const trailer =
        data.results.find(v => v.type === "Trailer" && v.site === "YouTube") ||
        data.results.find(v => v.site === "YouTube");

    if (!trailer) {
        alert("Trailer not available");
        return;
    }

    iframe.src = `https://www.youtube.com/embed/${trailer.key}?autoplay=1&rel=0`;
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeTrailer() {
    if (!modal || !iframe) return;
    modal.classList.remove("active");
    iframe.src = ""; // stop video
    document.body.style.overflow = "";
}