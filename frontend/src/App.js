import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5914";

function Movie({ name, desc, url }) {
  return (
    <div className="w-64 m-4 p-4 space-y-4 border-2 border-black hover:bg-slate-200">
      <h1 className="text-3xl font-semibold uppercase">{name}</h1>
      <img src={url} alt={name} className="w-auto" />
      <p>{desc}</p>
    </div>
  );
}

function App() {
  const [loaded, setLoaded] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get("/get").then((res) => {
      setMovies(res.data);
      setLoaded(true);
    });
  }, []);

  if (loaded) {
    return (
      <div>
        {movies.map((movie) => (
          <Movie
            name={movie.Name}
            desc={movie.Description}
            url={movie.Image_URL}
          />
        ))}
      </div>
    );
  } else {
    return (
      <div>
        <h1 className="text-8xl text-red-500 font-extrabold">LOADING MOVIES</h1>
      </div>
    );
  }
}

export default App;
