import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import MovieCard from "../components/MovieCard";

function MovieGrid({ setMovie, search }) {
  const history = useHistory();
  const handleClick = useCallback(() => history.push("/showings"), [history]);

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get("/movies").then((res) => {
      setMovies(res.data);
    });
  }, []);

  return (
    <div className="flex flex-wrap gap-4">
      {movies
        .filter((movie) =>
          movie.Name.toLowerCase().includes(search.toLowerCase())
        )
        .map((movie) => (
          <MovieCard
            key={movie.Movie_ID}
            name={movie.Name}
            length={movie.Length}
            genre={movie.Primary_Genre}
            desc={movie.Description}
            image={movie.Image_URL}
            onClick={() => {
              setMovie(movie.Movie_ID);
              handleClick();
            }}
          />
        ))}
    </div>
  );
}

function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      value={search}
      placeholder="Search"
      onChange={(e) => setSearch(e.target.value)}
      className="bg-gray-100 focus:bg-white outline-none p-2 rounded border border-gray-100 focus:border-gray-400 w-1/6"
    />
  );
}

function SelectMovie({ setMovie }) {
  const [search, setSearch] = useState("");
  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl uppercase font-thin">Select Movie</h1>
        <SearchBar search={search} setSearch={setSearch} />
      </div>
      <MovieGrid setMovie={setMovie} search={search} />
    </div>
  );
}

export default SelectMovie;
