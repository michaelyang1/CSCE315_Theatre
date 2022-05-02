import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { BiPencil } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { useHistory } from "react-router-dom";

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
  const navigate = useHistory();

  const handleUpdate = () => navigate.push(`/updateMovie/${id}`);

  const handleDelete = () => {
    // axios
    //   .delete("/movies", {
    //     data: {
    //       movieID: id,
    //     },
    //   })
    //   .then(() => {
    //     setReload((r) => !r);
    //   });
    alert("deleted");
  };

  return (
    <div className="relative flex group">
      <div className="flex transition ease-in-out duration-300 group-hover:blur-sm">
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:flex gap-4 hidden">
        <BiPencil
          className="w-16 h-auto fill-neutral-500 hover:fill-white cursor-pointer"
          onClick={handleUpdate}
        />
        <IoClose
          className="w-16 h-auto fill-red-500 cursor-pointer"
          onClick={handleDelete}
        />
      </div>
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
