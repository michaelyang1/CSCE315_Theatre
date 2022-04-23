import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function ShowingInfo({ name, image_url, date_time, ...props }) {
  const date = new Date(date_time);
  return (
    <div
      className="flex h-48 shadow-md hover:bg-slate-100 cursor-pointer"
      {...props}
    >
      <img src={image_url} alt={name} />
      <div className="m-4 space-y-2">
        <h1 className="text-4xl">{name}</h1>
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

function ShowingGrid({ movie_id, setRoom }) {
  const history = useHistory();
  const handleClick = useCallback(() => history.push("/seats"), [history]);

  const [showings, setShowings] = useState([]);

  useEffect(() => {
    axios
      .get("/showings", {
        params: {
          movie: movie_id,
        },
      })
      .then((res) => {
        setShowings(res.data);
      });
  }, [movie_id]);

  return (
    <div className="flex flex-1 flex-wrap gap-4">
      {showings.map((showing) => (
        <ShowingInfo
          name={showing.Name}
          image_url={showing.Image_URL}
          date_time={showing.Date_Time}
          onClick={() => {
            setRoom(showing.Room_ID);
            handleClick();
          }}
        />
      ))}
    </div>
  );
}

function SelectShowing({ movie_id, setRoom }) {
  return (
    <div>
      <h1 className="text-3xl mb-4 uppercase font-thin">Select Showing</h1>
      <ShowingGrid movie_id={movie_id} setRoom={setRoom} />
    </div>
  );
}

export default SelectShowing;
