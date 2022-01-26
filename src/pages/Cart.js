import axios from "axios";
import { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { listCartMovies } from '../lib/cart.js';
import Header from "../components/Header";
import Card from "../components/Card";

const Cart = ({ movies, onAddMovie, onRemoveMovie }) => {

  return (
    <div>
      <Header />
      <div className="form-component">
        <div className="form-container">
          <div className="result cart__container">
            {movies.length > 0 ? (
              movies.map((movie) => (
                <Card 
                  key={movie.id}
                  movie={movie}
                  cartMovies={movies}
                  onAdd={() => onAddMovie(movie)}
                  onRemove={() => onRemoveMovie(movie)}
                  />
              ))
            ) : (
              <h2>Nothing to show here</h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
