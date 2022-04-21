import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

function MovieGrid() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get("/movies").then((res) => {
      setMovies(res.data);
    });
  }, []);

  return (
    <div className="flex flex-1 flex-wrap gap-4">
      {movies.map((movie) => (
        <MovieCard
          key={movie.Movie_ID}
          name={movie.Name}
          length={movie.Length}
          genre={movie.Primary_Genre}
          desc={movie.Description}
          image={movie.Image_URL}
          onClick={() => alert("selected " + movie.Name)}
        />
      ))}
    </div>
  );
}

function SelectMovie() {
  return (
    <div>
      <h1 className="text-3xl mb-4 uppercase font-thin">Select Movie</h1>
      <MovieGrid />
    </div>
  );
}

export default SelectMovie;
