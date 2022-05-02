import axios from "axios";
import { useEffect, useState } from "react";
import { BiPencil } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { useHistory } from "react-router-dom";

// Contributed by Anubhav Aryal
function ShowingInfo({ name, id, imageURL, dateTime, imax, setReload }) {
  const date = new Date(dateTime);

  const navigate = useHistory();

  const handleUpdate = () => navigate.push(`/updateShowing/${id}`);

  const handleDelete = () => {
    axios
      .delete("/showings", {
        data: {
          showingID: id,
        },
      })
      .then(() => {
        setReload((r) => !r);
      });
  };

  return (
    <div className="relative flex group">
      <div className="flex transition ease-in-out duration-300 group-hover:blur-sm">
        <div className="flex h-48 shadow-md hover:bg-slate-100 cursor-pointer">
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

function ShowingGrid({ reload, setReload }) {
  const [showings, setShowings] = useState([]);

  useEffect(() => {
    axios.get("/showings").then((res) => {
      setShowings(res.data);
    });
  }, [reload]);

  return (
    <div className="flex flex-wrap gap-4 items-stretch">
      {showings.map((showing) => (
        <ShowingInfo
          key={showing.showing_ID}
          name={showing.Name}
          id={showing.Showing_ID}
          imageURL={showing.Image_URL}
          dateTime={showing.Date_Time}
          imax={showing.IMAX}
          setReload={setReload}
        />
      ))}
    </div>
  );
}

function EditShowings() {
  const [reload, setReload] = useState(false);

  return (
    <div>
      <h1 className="text-3xl mb-4 uppercase font-thin">Edit Showing</h1>
      <ShowingGrid reload={reload} setReload={setReload} />
    </div>
  );
}

export default EditShowings;
