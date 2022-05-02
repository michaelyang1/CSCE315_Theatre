import axios from "axios";
import { useEffect, useState } from "react";
import { BiPencil } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { useHistory } from "react-router-dom";

function Room({ id, capacity, imax, setReload }) {
  const navigate = useHistory();

  const handleEdit = () => {
    navigate.push(`/updateRoom/${id}`);
  };

  const handleDelete = () => {
    axios
      .delete("/rooms", { data: { roomID: id } })
      .then(() => setReload((r) => !r));
  };
  return (
    <div className="shadow-md p-4 cursor-pointer">
      <h1>Room ID: {id}</h1>
      <h1>Capacity: {capacity}</h1>
      <h1>IMAX: {imax ? "true" : "false"}</h1>
      <div className="flex gap-4 justify-center">
        <BiPencil className="w-8 h-auto" onClick={handleEdit} />
        <IoClose className="w-8 h-auto fill-red-500" onClick={handleDelete} />
      </div>
    </div>
  );
}

function RoomsGrid() {
  const [rooms, setRooms] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    axios.get("/rooms").then((res) => {
      setRooms(res.data);
    });
  }, [reload]);

  return (
    <div className="flex flex-wrap gap-4">
      {rooms.map((room) => (
        <Room
          id={room.Room_ID}
          capacity={room.Capacity}
          imax={room.IMAX}
          setReload={setReload}
        />
      ))}
    </div>
  );
}

function SelectRooms() {
  return (
    <div>
      <h1>Select Rooms</h1>
      <RoomsGrid />
    </div>
  );
}

export default SelectRooms;
