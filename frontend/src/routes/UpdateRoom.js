import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

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

function UpdateRoom() {
  const { id } = useParams();
  const navigate = useHistory();

  const [capacity, setCapacity] = useState(0);
  const [IMAX, setIMAX] = useState(0);

  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get("/rooms", {
        params: {
          room: id,
        },
      })
      .then((res) => {
        const room = res.data[0];

        setCapacity(room.Capacity);
        setIMAX(room.IMAX);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (capacity === "" || IMAX === "") {
      setError(true);
    } else {
      setError(false);
      alert(`Room Update Successful!`);
      axios
        .patch("/rooms", {
          Room_ID: id,
          Capacity: capacity,
          IMAX: IMAX,
        })
        .then(() => {
          navigate.goBack();
        });
    }
  };

  return (
    <form className="space-y-2 shadow-md p-4" noValidate>
      <div>
        <Field
          value={capacity}
          setValue={setCapacity}
          success={false}
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
          success={false}
          placeholder="Is room IMAX?"
          label="IMAX:"
          id="IMAX"
          type="input"
        />
      </div>

      <p className={`${!error ? "hidden" : ""} text-red-500 italic text-sm`}>
        Cannot update room until all fields are filled.
      </p>

      <div>
        <button
          className="border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white px-4 py-2 rounded font-semibold hover:shadow-md hover:shadow-emerald-200"
          onClick={handleSubmit}
        >
          Update Room
        </button>
      </div>
    </form>
  );
}

export default UpdateRoom;
