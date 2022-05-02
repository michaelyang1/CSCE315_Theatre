import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { MdOutlineClose } from "react-icons/md";

// Contributed by Michael Yang as part of the Movie Create and Delete feature set (Feature Set 2)
function DeletionCard({
  id,
  name,
  length,
  genre,
  desc,
  image,
  setReload,
  ...props
}) {
  const [hover, setHover] = useState(false);

  const handleClick = () => {
    axios
      .delete("/movies", {
        data: {
          movieID: id,
        },
      })
      .then(() => {
        setReload((r) => !r);
      });
  };

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
          key={id}
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
        onClick={handleClick}
      />
    </div>
  );
}

function MovieGrid({ reload, setReload }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get("/movies").then((res) => {
      setMovies(res.data);
    });
  }, [reload]);

  return (
    <div className="flex flex-wrap gap-4 items-stretch">
      {movies.map((movie) => (
        <DeletionCard
          key={movie.Movie_ID}
          id={movie.Movie_ID}
          name={movie.Name}
          length={movie.Length}
          genre={movie.Primary_Genre}
          desc={movie.Description}
          image={movie.Image_URL}
          setReload={setReload}
        />
      ))}
    </div>
  );
}

function DeleteMovie() {
  const [reload, setReload] = useState(false);

  return (
    <div>
      <h1 className="text-3xl mb-4 uppercase font-thin">Delete Movie</h1>
      <MovieGrid reload={reload} setReload={setReload} />
    </div>
  );
}

export default DeleteMovie;
