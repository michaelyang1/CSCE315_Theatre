import { MdEventSeat } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";

function Seat({ num, setSelectedSeats, active }) {
  const [hover, setHover] = useState(false);
  const [selected, setSelected] = useState(false);

  return (
    <div className="w-12">
      <MdEventSeat
        color={`${
          active
            ? selected
              ? "#0ea5e9"
              : hover
              ? "#22c55e"
              : "#9ca3af"
            : "black"
        }`}
        className={`w-full h-full cursor-pointer ${
          active ? "" : "pointer-events-none"
        }`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => {
          if (!selected) {
            setSelected(true);
            setSelectedSeats((selectedSeats) => [...selectedSeats, num]);
          } else {
            setSelected(false);
            setSelectedSeats((selectedSeats) =>
              selectedSeats.filter((selectedSeat) => selectedSeat !== num)
            );
          }
        }}
      />
    </div>
  );
}

function RoomInfo({ capacity, imax }) {
  return (
    <div className="flex gap-4">
      <h1 className="uppercase font-semibold text-sm">Capacity {capacity}</h1>
      <h1 className={`uppercase italic text-sm ${imax ? "" : "hidden"}`}>
        IMAX
      </h1>
    </div>
  );
}

function SeatGrid({ room_id, capacity, setSelectedSeats }) {
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    axios.get("/seats").then((res) => {
      setSeats(res.data);
    });
  }, []);

  return (
    <div className="grid grid-cols-8 grid-gap-4">
      {[...Array(capacity)].map((_val, index) => {
        let seat_num = room_id + index + 1;
        return (
          <Seat
            key={seat_num}
            num={seat_num}
            setSelectedSeats={setSelectedSeats}
            active={seats.some((seat) => seat.Seat_ID === seat_num)}
          />
        );
      })}
    </div>
  );
}

function SelectedSeats({ selectedSeats }) {
  return (
    <div className="shadow-md p-4">
      <h1 className="font-semibold uppercase">Selected Seats</h1>
      {selectedSeats.map((selectedSeat) => (
        <h1 key={selectedSeat} className="font-thin">
          {selectedSeat}
        </h1>
      ))}
    </div>
  );
}

function SeatsInput({
  room_id,
  capacity,
  imax,
  selectedSeats,
  setSelectedSeats,
}) {
  const [error, setError] = useState(false);

  const handleClick = () => {
    if (selectedSeats.length > 0) {
      setError(false);
      alert("selected the following seats: " + selectedSeats);
    } else {
      setError(true);
    }
  };

  return (
    <div className="shadow-md p-4 space-y-4">
      <RoomInfo capacity={capacity} imax={imax} />
      <SeatGrid
        room_id={room_id}
        capacity={capacity}
        imax={imax}
        setSelectedSeats={setSelectedSeats}
      />
      <p className={`${error ? "" : "hidden"} text-red-500 text-sm italic`}>
        You must select at least one seat.
      </p>
      <button
        className="border border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white px-4 py-2 rounded font-semibold"
        onClick={handleClick}
      >
        Add Seats
      </button>
    </div>
  );
}

function SelectSeats({ room_id }) {
  const [capacity, setCapacity] = useState(0);
  const [imax, setIMAX] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    axios
      .get("/rooms", {
        params: {
          room: room_id,
        },
      })
      .then((res) => {
        setCapacity(res.data[0].Capacity);
        setIMAX(res.data[0].IMAX);
      });
  }, [room_id]);

  return (
    <div className="flex justify-center">
      <div className="w-1/2">
        <h1 className="text-3xl mb-4 uppercase font-thin">Select Seats</h1>
        <div className="flex items-start gap-4">
          <div className="flex-grow">
            <SeatsInput
              room_id={room_id}
              capacity={capacity}
              imax={imax}
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
            />
          </div>
          <div>
            <SelectedSeats selectedSeats={selectedSeats} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectSeats;
