import { MdEventSeat } from "react-icons/md";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Seat({ num, setSelectedSeats, active }) {
  const [selected, setSelected] = useState(false);

  return (
    <div className="w-12">
      <MdEventSeat
        className={`w-full h-full cursor-pointer fill-neutral-500 ${
          active
            ? selected
              ? "!fill-sky-500"
              : "hover:fill-green-500"
            : "fill-black pointer-events-none"
        }`}
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

function SeatGrid({ roomID, showingID, capacity, setSelectedSeats }) {
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    axios
      .get("/seats", {
        params: {
          showing: showingID,
        },
      })
      .then((res) => {
        setSeats(res.data);
      });
  }, [showingID]);

  return (
    <div className="grid grid-cols-8 grid-gap-4">
      {[...Array(capacity)].map((_val, index) => {
        let seat_num = roomID + index + 1;
        return (
          <Seat
            key={seat_num}
            num={seat_num}
            setSelectedSeats={setSelectedSeats}
            active={seats.some(
              (seat) => seat.Seat_ID === seat_num && !seat.Reserved
            )}
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
  roomID,
  showingID,
  capacity,
  imax,
  selectedSeats,
  setSelectedSeats,
}) {
  const history = useHistory();
  const [error, setError] = useState(false);

  const handleClick = useCallback(() => history.push("/confirm"), [history]);

  return (
    <div className="shadow-md p-4 space-y-4">
      <RoomInfo capacity={capacity} imax={imax} />
      <SeatGrid
        roomID={roomID}
        showingID={showingID}
        capacity={capacity}
        imax={imax}
        setSelectedSeats={setSelectedSeats}
      />
      <p className={`${error ? "" : "hidden"} text-red-500 text-sm italic`}>
        You must select at least one seat.
      </p>
      <button
        className="border border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white px-4 py-2 rounded font-semibold hover:shadow-md hover:shadow-sky-300"
        onClick={() => {
          if (selectedSeats.length > 0) {
            setError(false);
            handleClick();
          } else {
            setError(true);
          }
        }}
      >
        Add Seats
      </button>
    </div>
  );
}

function SelectSeats({ roomID, showingID, selectedSeats, setSelectedSeats }) {
  const [capacity, setCapacity] = useState(0);
  const [imax, setIMAX] = useState(false);

  useEffect(() => {
    axios
      .get("/rooms", {
        params: {
          room: roomID,
        },
      })
      .then((res) => {
        setCapacity(res.data[0].Capacity);
        setIMAX(res.data[0].IMAX);
      });
  }, [roomID]);

  return (
    <div className="flex justify-center">
      <div className="w-1/2">
        <h1 className="text-3xl mb-4 uppercase font-thin">Select Seats</h1>
        <div className="flex items-start gap-4">
          <div className="flex-grow">
            <SeatsInput
              roomID={roomID}
              showingID={showingID}
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
