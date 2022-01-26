import React from "react";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  listCartMovies,
  addMovieToCart,
  removeMoviefromCart,
} from "./lib/cart.js";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

function App() {
  const [movies, setMovies] = useState(listCartMovies());

  const handleAddMovie = function (movie) {
    // add movie to list
    addMovieToCart(movie);
    setMovies(listCartMovies());
  };

  const handleRemoveMovie = function (movie) {
    // remove movie from list
    removeMoviefromCart(movie.id);
    setMovies(listCartMovies());
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                cartMovies={movies}
                onAddMovie={(movie) => handleAddMovie(movie)}
                onRemoveMovie={(movie) => handleRemoveMovie(movie)}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                onAddMovie={(movie) => handleAddMovie(movie)}
                onRemoveMovie={(movie) => handleRemoveMovie(movie)}
                movies={movies}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
