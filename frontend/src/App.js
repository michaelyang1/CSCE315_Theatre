import logo from "./logo.svg";
import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5914";

function Movie({ name, desc, url }) {
  return (
    <div className="movie">
      <h1>{name}</h1>
      <img src={url} alt={name} style={{ width: "auto" }} />
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
          <Movie name={movie.Name} desc={movie.Description} url={movie.URL} />
        ))}
      </div>
    );
  } else {
    return (
      <div>
        <h1>LOADING MOVIES</h1>
      </div>
    );
  }
}

export default App;
