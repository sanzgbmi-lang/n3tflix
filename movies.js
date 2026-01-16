const API_KEY = "5ebfe36c5bbfbd1bdb4f1a9080287aca";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w342";

document.addEventListener("DOMContentLoaded", () => {
    fetchMovies("/movie/popular", "popular");
    fetchMovies("/movie/top_rated", "topRated");
    fetchMovies("/movie/upcoming", "upcoming");
});

async function fetchMovies(endpoint, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";

    const res = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}`);
    const data = await res.json();

    data.results.forEach(movie => {
        if (!movie.poster_path || !movie.id) return;

        const link = document.createElement("a");
        link.href = `movie.html?id=${movie.id}&type=movie`;
        link.style.display = "inline-block";

        const img = document.createElement("img");
        img.src = IMG_URL + movie.poster_path;
        img.alt = movie.title;
        img.loading = "lazy";

        link.appendChild(img);
        container.appendChild(link);
    });
}