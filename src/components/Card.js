import { getMouseEventOptions } from "@testing-library/user-event/dist/utils";
import { useEffect, useState } from "react/cjs/react.development";
import "./Card.css";

const Card = ({ movie, isAlreadyAdded, cartMovies, onAdd, onRemove }) => {
  const [addToCart, setAddToCart] = useState(true);

  useEffect(() => {
    const movieIds = cartMovies.map((movie) => movie.id);

    if (movieIds.includes(movie.id)) {
      setAddToCart(false);
    } else {
      setAddToCart(true);
    }
  }, []);

  const addToCartHandler = () => {
    setAddToCart(!addToCart);
    if (addToCart) {
      onAdd();
    } else {
      onRemove();
    }
  };

  return (
    <div className="card__container">
      <div className="card__imgContainer">
        <div className="card__overlay"></div>
        <img
          src={
            movie.poster_path
              ? "https://image.tmdb.org/t/p/w500" + movie.poster_path
              : "./img/poster.jpg"
          }
          className="movie__poster"
          alt="movie poster"
        />
        <h2 className="movie__title">{movie.title}</h2>
      </div>

      <div className="movie__header">
        {movie.release_date ? (
          <div className="movie__release">Released on {movie.release_date}</div>
        ) : (
          <div className="movie__release">No release date provided</div>
        )}
        <div className="movie__vote">
          {movie.vote_average} <i className="fas fa-star"></i>
        </div>
      </div>

      <ul className="movie__genres">
        {movie.genres.slice(0, 3).map((genre) => (
          <li key={genre} className="movie__genre">
            {genre}
          </li>
        ))}
      </ul>

      <div className="movie__overviewContainer">
        <div className="movie__overviewOverlay"></div>
        {movie.overview ? (
          <div className="movie__overview">{movie.overview}</div>
        ) : (
          ""
        )}
      </div>
      <button
        className={addToCart ? "movie__cta" : "movie__cta--isActive"}
        onClick={addToCartHandler}
      >
        {addToCart ? "Add To cart" : "Remove from cart"}
        <i className="icon__cart fas fa-shopping-cart"></i>
      </button>
    </div>
  );
};

export default Card;
