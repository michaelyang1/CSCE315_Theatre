import axios from "axios";
import { useEffect, useState } from "react";

function ShowingInfo({ movie, date_time }) {
  const date = new Date(date_time);
  return (
    <div className="flex h-48 shadow-md hover:bg-slate-100">
      <img src={movie.Image_URL} alt={movie.name} />
      <div className="m-4 space-y-2">
        <h1 className="text-4xl">{movie.Name}</h1>
        <h2 className="text-3xl font-light">
          {date.toLocaleString("default", {
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </h2>
      </div>
    </div>
  );
}

function ShowingGrid({ movie }) {
  const [showings, setShowings] = useState([]);

  useEffect(() => {
    axios
      .get("/showings", {
        params: {
          movie: movie.Movie_ID,
        },
      })
      .then((res) => {
        setShowings(res.data);
      });
  }, [movie]);

  return (
    <div className="flex flex-1 flex-wrap gap-4">
      {showings.map((showing) => (
        <ShowingInfo movie={movie} date_time={showing.Date_Time} />
      ))}
    </div>
  );
}

function SelectShowing({ movie }) {
  return (
    <div>
      <h1 className="text-3xl mb-4 uppercase font-thin">Select Showing</h1>
      <ShowingGrid movie={movie} />
    </div>
  );
}

export default SelectShowing;
