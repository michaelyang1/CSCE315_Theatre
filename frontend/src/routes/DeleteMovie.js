import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { MdOutlineClose } from "react-icons/md";

function DeletionCard({ key, name, length, genre, desc, image, ...props }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="relative flex"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className={`flex transition ease-in-out duration-300 ${
          hover ? "blur-sm" : ""
        }`}
      >
        <MovieCard
          key={key}
          name={name}
          length={length}
          genre={genre}
          desc={desc}
          image={image}
          {...props}
        />
      </div>
      <MdOutlineClose
        color="red"
        className={`absolute top-0 left-0 mx-auto text-center scale-50 w-full h-full cursor-pointer ${
          hover ? "" : "hidden"
        }`}
        onClick={() => alert("pretend to delete " + name)}
      />
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
    <div className="flex flex-wrap gap-4 items-stretch">
      {movies.map((movie) => (
        <DeletionCard
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

function DeleteMovie() {
  return (
    <div>
      <h1 className="text-3xl mb-4 uppercase font-thin">Delete Movie</h1>
      <MovieGrid />
    </div>
  );
}

export default DeleteMovie;
