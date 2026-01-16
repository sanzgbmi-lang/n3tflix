/* =====================================================
   HOME PAGE SCRIPT (TOP 10 + RECOMMENDED ONLY)
   ===================================================== */

/* ================= TOP 10 TODAY ================= */

async function fetchTop10(endpoint, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";

  try {
    const res = await fetch(
      `${BASE_URL}${endpoint}?api_key=${API_KEY}`
    );
    const data = await res.json();

    data.results.slice(0, 10).forEach((item, index) => {
      if (!item.poster_path) return;

      const type = item.title ? "movie" : "tv";

      const link = document.createElement("a");
      link.href = `movie.html?id=${item.id}&type=${type}`;
      link.className = "top10-item";

      const rank = document.createElement("span");
      rank.className = "top10-rank";
      rank.textContent = index + 1;

      const img = document.createElement("img");
      img.src = IMG_URL + item.poster_path;
      img.alt = item.title || item.name;
      img.loading = "lazy";

      link.appendChild(rank);
      link.appendChild(img);
      container.appendChild(link);
    });
  } catch (err) {
    console.error("Top 10 error:", err);
  }
}

/* ================= RECOMMENDED FOR YOU ================= */

async function fetchRecommended() {
  const container = document.getElementById("recommended");
  if (!container) return;

  container.innerHTML = "";

  try {
    const res = await fetch(
      `${BASE_URL}/discover/movie?sort_by=popularity.desc&vote_average.gte=7&api_key=${API_KEY}`
    );
    const data = await res.json();

    data.results.forEach(movie => {
      if (!movie.poster_path) return;

      const link = document.createElement("a");
      link.href = `movie.html?id=${movie.id}&type=movie`;

      const img = document.createElement("img");
      img.src = IMG_URL + movie.poster_path;
      img.alt = movie.title;
      img.loading = "lazy";

      link.appendChild(img);
      container.appendChild(link);
    });
  } catch (err) {
    console.error("Recommended error:", err);
  }
}

/* ================= INIT ================= */

document.addEventListener("DOMContentLoaded", () => {
  fetchTop10("/trending/all/day", "top10");
  fetchRecommended();
});
