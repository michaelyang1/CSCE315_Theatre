import axios from "axios";
import { useEffect, useState } from "react";

function MovieCard({ name, length, genre, desc, image }) {
  return (
    <div
      className="w-52 shadow-md hover:bg-slate-100 flex flex-col cursor-pointer"
      onClick={() => window.alert("selected " + name)}
    >
      <img src={image} alt={name} />
      <div className="flex flex-col flex-1 justify-between p-2">
        <div>
          <h1 className="text-lg font-semibold">{name}</h1>
          <p className="text-sm">{desc}</p>
        </div>
        <div className="flex justify-between">
          <p className="italic">{genre}</p>
          <p className="font-semibold">{length} min</p>
        </div>
      </div>
    </div>
  );
}

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
