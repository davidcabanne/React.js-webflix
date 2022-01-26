import { useEffect, useState, useRef } from "react/cjs/react.development";
import Card from "./Card";
import "./Form.css";
import { searchMoviesFromAPI } from "../lib/api.js";

const SCROLL_THRESHOLD = 0.9;

const Form = ({ cartMovies, onAddMovie, onRemoveMovie }) => {
  const [keywords, setKeywords] = useState("star wars");
  const [searchParams, setSearchParams] = useState({
    keywords: keywords,
    page: 1,
  });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [sortBestToWorst, setSortBestToWorst] = useState(null);

  // SCROLL TESTS
  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    let scrollPercent = (scrollTop + clientHeight) / scrollHeight;
    if (scrollPercent >= SCROLL_THRESHOLD && loading === false) {
      setLoading(true);
      console.log("call setSearchParams");
      setSearchParams({
        keywords: keywords,
        page: searchParams.page + 1,
      });
    }
  };

  const handleSubmit = function (event) {
    setSearchParams({
      keywords: keywords,
      page: 1,
    });
    event.preventDefault();
  };

  useEffect(() => {
    console.log("searchParams changed");
    searchMovies();
  }, [searchParams]);

  async function searchMovies() {
    console.log("searching with params", searchParams);
    const results = await searchMoviesFromAPI(
      searchParams.keywords,
      searchParams.page
    );
    console.log("got results", results);
    if (searchParams.page === 1) {
      setResults(results);
    } else {
      setResults((prev) => [...prev, ...results]);
    }
    setLoading(false);
  }

  useEffect(() => {
    // DID MOUNT
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      // WILL UNMOUNT
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <div className="form-component">
      <div className="form-container">
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            placeholder="Enter a movie title"
            id="search-input"
            value={keywords}
            onChange={(event) => setKeywords(event.target.value)}
            autocomplete="off"
          />
          <div className="icon-search__container" onClick={handleSubmit}>
            <i className="fas fa-search icon-search"></i>
          </div>
        </form>
        <div className="btn-sort__container">
          <div
            className={
              sortBestToWorst === "bestToWorst"
                ? "btn-sort--isActive"
                : "btn-sort"
            }
            id="bestToWorst"
            onClick={() => setSortBestToWorst("bestToWorst")}
          >
            <span>Best</span>
            <i className="fas fa-chevron-up"></i>
          </div>
          <div
            className={
              sortBestToWorst === "worstToBest"
                ? "btn-sort--isActive"
                : "btn-sort"
            }
            id="worstToBest"
            onClick={() => setSortBestToWorst("worstToBest")}
          >
            <span>Worst</span> <i className="fas fa-chevron-down"></i>
          </div>

          <div
            className={
              sortBestToWorst === null ? "btn-reset--isActive" : "btn-reset"
            }
            onClick={() => setSortBestToWorst(null)}
          >
            <span>Reset</span>
          </div>
        </div>
      </div>
      <div className="result" onScroll={handleScroll}>
        {results
          .sort((a, b) => {
            if (sortBestToWorst === "bestToWorst") {
              return b.vote_average - a.vote_average;
            } else if (sortBestToWorst === "worstToBest") {
              return a.vote_average - b.vote_average;
            }
          })
          .map((movie) => (
            <Card
              key={movie.id}
              movie={movie}
              cartMovies={cartMovies}
              onAdd={() => onAddMovie(movie)}
              onRemove={() => onRemoveMovie(movie)}
            />
          ))}
      </div>
      {loading ? <div className="loading">Loading...</div> : ""}
    </div>
  );
};

export default Form;
