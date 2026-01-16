const API_KEY = "5ebfe36c5bbfbd1bdb4f1a9080287aca";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w342";

const input = document.getElementById("search-input");
const results = document.getElementById("search-results");

let timer;

input.addEventListener("input", () => {
  clearTimeout(timer);

  const query = input.value.trim();
  if (!query) {
    results.innerHTML = "";
    return;
  }

  timer = setTimeout(() => search(query), 400);
});

async function search(query) {
  const res = await fetch(
    `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );
  const data = await res.json();

  results.innerHTML = "";

  data.results.forEach(item => {
    if (!item.poster_path) return;
    if (item.media_type !== "movie" && item.media_type !== "tv") return;

    const img = document.createElement("img");
    img.src = IMG_URL + item.poster_path;
    img.alt = item.title || item.name;

    img.addEventListener("click", () => {
      window.location.href = `movie.html?id=${item.id}&type=${item.media_type}`;
    });

    results.appendChild(img);
  });
}
