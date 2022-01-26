
const STORAGE_KEY = 'movielist';

// List all movies in cart
function listCartMovies() {
	const movies = loadMovies()
	return movies;
}

// Add movie object to cart
function addMovieToCart(movie) {
	const movies = loadMovies();
	movies.push(movie);
	saveMovies(movies);
}

// Remove movie from cart by ID
function removeMoviefromCart(movieId) {
	let movies = loadMovies();
	movies = movies.filter(movie => movie.id !== movieId)
	saveMovies(movies);
}

// Load movies from localStorage
function loadMovies() {
	let movies = [];

	let value = localStorage.getItem(STORAGE_KEY);
	if (value !== null) {
		movies = JSON.parse(value);
	}

	return movies;
}

// Save movies to localStorage
function saveMovies(movies) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
}

export {
	listCartMovies,
	addMovieToCart,
	removeMoviefromCart
};