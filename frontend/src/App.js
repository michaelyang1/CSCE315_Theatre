import logo from "./logo.svg";
import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Image } from 'react';

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
    document.body.style.backgroundColor = "black"
    return (
      <div  className='background-black' >
        <span className="font-link" >LOADING MOVIES</span>
        <img  className = "movieReel" src = {"https://img.icons8.com/windows/2x/film-reel--v2.gif"}/>
      </div>
    );
  }
}

export default App;
