import axios from "axios";

const API_KEY = "2e92d87c5afc064a3b7fadb558808ac3";
const API_URL = "https://api.themoviedb.org/3";
const GENRES = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Police",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science-fiction",
  10770: "Television",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

// Call API with keywords and return normalized movie list.
async function searchMoviesFromAPI(keywords, pageNumber) {
  // const pageNumber = 1;
  const url =
    API_URL +
    `/search/movie?api_key=${API_KEY}&query=${keywords}&page=${pageNumber}&language=en-US`;
  const response = await axios.get(url);
  const movies = response.data.results.map(normalizeResult);
  return movies;
}

// Call API with movie ID and return normalized movie object.
async function getMovieFromAPI(movieId) {
  const url = API_URL + `/movie/${movieId}?api_key=${API_KEY}&language=en-US`;
  const response = await axios.get(url);
  const result = response.data;
  const movie = normalizeResult(result);
  return movie;
}

function normalizeResult(result) {
  let genres = [];

  if ("genre_ids" in result) {
    genres = result.genre_ids.map((genreId) => {
      if (genreId in GENRES) {
        return GENRES[genreId];
      } else {
        return "Unknown";
      }
    });
  }

  if ("genres" in result) {
    genres = result.genres.map((genre) => genre.name);
  }

  if (genres.length === 0) {
    genres[0] = "Unknown";
  }

  return {
    id: result.id,
    genres: genres,
    overview: result.overview,
    title: result.title,
    poster_path: result.poster_path,
    release_date: result.release_date,
    vote_average: result.vote_average,
  };
}

export { searchMoviesFromAPI, getMovieFromAPI };
