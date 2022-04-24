import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function ShowingInfo({ name, image_url, date_time, imax, ...props }) {
  const date = new Date(date_time);
  return (
    <div
      className="flex h-48 shadow-md hover:bg-slate-100 cursor-pointer"
      {...props}
    >
      <img src={image_url} alt={name} />
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

<<<<<<< HEAD
function ShowingGrid({ movie_id, setRoom }) {
  const history = useHistory();
  const handleClick = useCallback(() => history.push("/seats"), [history]);

=======
/*
function ShowingGrid({ movie }) {
>>>>>>> 4636c202ebfe192990320e682ef3f37ed7d1dd24
  const [showings, setShowings] = useState([]);

  useEffect(() => {
    console.log("sending api request");
    axios
      .get("/showings", {
        params: {
          movie: movie_id,
        },
      })
      .then((res) => setShowings(res.data));
  }, [movie_id]);

  return (
    <div className="flex flex-wrap gap-4">
      {showings.map((showing) => (
        <ShowingInfo
          name={showing.Name}
          image_url={showing.Image_URL}
          date_time={showing.Date_Time}
          imax={showing.IMAX}
          onClick={() => {
            setRoom(showing.Room_ID);
            handleClick();
          }}
        />
      ))}
    </div>
  );
}
*/

<<<<<<< HEAD
function SelectShowing({ movie_id, setRoom }) {
=======

function ShowingGrid() {
  const [showings, setShowings] = useState([]);

  useEffect(() => {
    axios
      .get("/showings").then((res) => {
        setShowings(res.data);
      });
  }, []);

  return (
    <div className="flex flex-1 flex-wrap gap-4">
      {showings.map((showing) => (
        <ShowingInfo name={showing.Name} image_url={showing.Image_URL} date_time={showing.Date_Time} />
      ))}
    </div>
  );
}

/*
function SelectShowing({ movie }) {
>>>>>>> 4636c202ebfe192990320e682ef3f37ed7d1dd24
  return (
    <div>
      <h1 className="text-3xl mb-4 uppercase font-thin">Select Showing</h1>
      <ShowingGrid movie_id={movie_id} setRoom={setRoom} />
    </div>
  );
}
*/

function SelectShowing() {
  return (
    <div>
      <h1 className="text-3xl mb-4 uppercase font-thin">Select Showing</h1>
      <ShowingGrid />
    </div>
  );
}



export default SelectShowing;
