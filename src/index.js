import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { searchMoviesFromAPI, getMovieFromAPI } from './lib/api.js';
import { listCartMovies, addMovieToCart, removeMoviefromCart } from './lib/cart.js';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

window.searchMoviesFromAPI = searchMoviesFromAPI;
window.getMovieFromAPI = getMovieFromAPI;

window.listCartMovies = listCartMovies;
window.addMovieToCart = addMovieToCart;
window.removeMoviefromCart = removeMoviefromCart;
