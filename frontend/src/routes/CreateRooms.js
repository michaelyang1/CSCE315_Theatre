import axios from "axios";
import { NEWDATE } from "mysql/lib/protocol/constants/types";
import { useEffect, useState } from "react";
import { BsStarFill, BsTextCenter } from "react-icons/bs";


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
function Room() {
  const [Room_ID, setRoom_ID] = useState(0);
  const [Capacity, setCapacity] = useState(0);
  const [IMAX, setIMAX] = useState(0);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    if (Room_ID === "" || Capacity === "" || IMAX === "") {
      setError(true);
    } else {
      setError(false);
      alert(
        `Room Creation Successful!`
      );
      axios.post("/rooms", {
            Room_ID: Room_ID,
            Capacity: Capacity,
            IMAX: IMAX 
          })
          .then(() => {
              setSuccess(true)
              setRoom_ID("");
              setCapacity("");
              setIMAX("");
          });
    }
  };
  const setIMAXYes = () =>{
      IMAX = 1;
  };
  const setIMAXNo = () =>{
      IMAX = 0;
  };

  return (
    <form
      className="space-y-2 shadow-md p-4"
      noValidate
    >
        <div>
            <Field
            value={Room_ID}
            setValue={setRoom_ID}
            success={success}
            placeholder="Enter Room Number."
            label="Room Number:"
            id="Room_ID"
            type="input"
            />
        </div>

        <div>
            <Field
            value={Capacity}
            setValue={setCapacity}
            success={success}
            placeholder="Enter Capacity."
            label="Room Capacity:"
            id="Capacity"
            type="input"
            />
        </div>

        <div>
            <Field
            value={IMAX}
            setValue={setIMAX}
            success={success}
            placeholder="Is room IMAX?"
            label="IMAX:"
            id="IMAX"
            type="input"
            />
        </div>


        <p className={`${!error ? "hidden" : ""} text-red-500 italic text-sm`}>
            Cannot Create Room until all fields are filled.
        </p>

        <div>
            <button
            className="border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white px-4 py-2 rounded font-semibold hover:shadow-md hover:shadow-emerald-200"
            onClick={handleSubmit}
            >
            Create Room 
            </button>
        </div>
    </form>
  );
}




function CreateRooms({user}) {
  const [reload, setReload] = useState(false);
  return (
    <div className="flex justify-center">
      <div className="w-2/5 flex flex-col gap-4">
        <h1 className="text-3xl uppercase font-thin">Create Room</h1>
        {<Room/>}
      </div>
    </div>
  );
}



export default CreateRooms;
