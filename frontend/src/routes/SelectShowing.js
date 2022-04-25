import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function ShowingInfo({ name, imageURL, dateTime, imax, ...props }) {
  const date = new Date(dateTime);
  return (
    <div
      className="flex h-48 shadow-md hover:bg-slate-100 cursor-pointer"
      {...props}
    >
      <img src={imageURL} alt={name} />
      <div className="m-4 space-y-2 relative">
        <h1 className="text-4xl">{name}</h1>
        <h2 className="text-3xl font-light">
          {date.toLocaleString("default", {
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </h2>
        <p
          className={`${
            imax ? "" : "hidden"
          } bg-orange-400 px-2 py-1 rounded font-bold absolute bottom-0 right-0`}
        >
          IMAX
        </p>
      </div>
    </div>
  );
}

function ShowingGrid({ movieID, setShowing, setRoom }) {
  const history = useHistory();
  const handleClick = useCallback(() => history.push("/seats"), [history]);

  const [showings, setShowings] = useState([]);

  useEffect(() => {
    console.log("sending api request");
    axios
      .get("/showings", {
        params: {
          movie: movieID,
        },
      })
      .then((res) => setShowings(res.data));
  }, [movieID]);

  return (
    <div className="flex flex-wrap gap-4">
      {showings.map((showing) => (
        <ShowingInfo
          key={showing.Showing_ID}
          name={showing.Name}
          imageURL={showing.Image_URL}
          dateTime={showing.Date_Time}
          imax={showing.IMAX}
          onClick={() => {
            setShowing(showing.Showing_ID);
            setRoom(showing.Room_ID);
            handleClick();
          }}
        />
      ))}
    </div>
  );
}

function SelectShowing({ movieID, setShowing, setRoom }) {
  return (
    <div>
      <h1 className="text-3xl mb-4 uppercase font-thin">Select Showing</h1>
      <ShowingGrid
        movieID={movieID}
        setShowing={setShowing}
        setRoom={setRoom}
      />
    </div>
  );
}

export default SelectShowing;
