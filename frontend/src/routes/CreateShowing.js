import axios from "axios";
import { useState } from "react";

function Field({
  value,
  setValue,
  success,
  placeholder,
  label,
  id,
  type = "text",
}) {
  const className = `w-full bg-gray-100 border  ${
    success ? "border-emerald-500" : "invalid:border-red-400"
  } border-gray-100 focus:bg-white outline-none p-2 rounded focus:border-gray-400`;

  return (
    <>
      <label htmlFor={id} className="uppercase font-semibold tracking-wider">
        {label}
      </label>
      {type !== "textarea" ? (
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
          required
          className={className}
          id={id}
        />
      ) : (
        <textarea
          value={value}
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
          required
          className={className}
          id={id}
        />
      )}
    </>
  );
}

//function Room(Room_ID, Capacity, IMAX) {
function Showing() {
  const [Movie_ID, setMovie_ID] = useState(0);
  const [Room_ID, setRoom_ID] = useState(0);
  const [time, setTime] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    if (Movie_ID === "" || Room_ID === "" || time === "") {
      setError(true);
    } else {
      setError(false);
      alert(`Showing Creation Successful!`);
      axios
        .post("/showings", {
          movieID: Movie_ID,
          roomID: Room_ID,
          time: time,
        })
        .then(() => {
        });
    }
  };

  return (
    <form className="space-y-2 shadow-md p-4" noValidate>
      <div>
        <Field
          value={Movie_ID}
          setValue={setMovie_ID}
          success={success}
          placeholder="Enter Movie ID."
          label="Movie ID:"
          id="Movie_ID"
          type="input"
        />
      </div>

      <div>
        <Field
          value={Room_ID}
          setValue={setRoom_ID}
          success={success}
          placeholder="Enter room number."
          label="Room Number:"
          id="Room_ID"
          type="input"
        />
      </div>

      <div>
        <Field
          value={time}
          setValue={setTime}
          success={success}
          placeholder="YYYY-MM-DD HH:MM"
          label="Enter Date and Time of Movie in format: 'YYYY-MM-DD HH:MM':"
          id="time"
          type="input"
        />
      </div>

      <p className={`${!error ? "hidden" : ""} text-red-500 italic text-sm`}>
        Cannot Create Showing until all fields are filled.
      </p>

      <div>
        <button
          className="border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white px-4 py-2 rounded font-semibold hover:shadow-md hover:shadow-emerald-200"
          onClick={handleSubmit}
        >
          Create Showing 
        </button>
      </div>
    </form>
  );
}

function CreateShowing({ user }) {
  const [reload, setReload] = useState(false);
  return (
    <div className="flex justify-center">
      <div className="w-2/5 flex flex-col gap-4">
        <h1 className="text-3xl uppercase font-thin">Create Showing</h1>
        {<Showing />}
      </div>
    </div>
  );
}

export default CreateShowing;
