import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Contributed by David Erdner

// allows users to view their own profile
function ViewProfile() {
  const { id } = useParams();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [favoriteMovie, setFavoriteMovie] = useState("");
  const [favoriteRoom, setFavoriteRoom] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    axios
      .get("/users", {
        params: {
          id: id,
        },
      })
      .then((res) => {
        const user = res.data[0];

        setFirstName(user.First_Name);
        setLastName(user.Last_Name);
        setUsername(user.Username);
        setPassword(user.Password);
        setFavoriteMovie(user.Favorite_Movie);
        setFavoriteRoom(user.Favorite_Room);
        setPhoneNumber(user.Phone_Number);
      });
  }, [id]);

  // Create way for users to view tickets
  useEffect(() => {
    axios
      .get("/tickets", {
        params: {
          id: id,
        },
      })
      .then((res) => {
        setTickets(res.data);
      });
  }, [id]);

  return (
    <div className="font-mono">
      <h1 className="text-lg font-semibold break-words">USER INFORMATION:</h1>
      <h1>First Name: {firstName}</h1>
      <h1>Last Name: {lastName}</h1>
      <h1>Username: {username}</h1>
      <h1>Password: {password}</h1>
      <h1>Favorite Movie: {favoriteMovie}</h1>
      <h1>Favorite Room: {favoriteRoom}</h1>
      <h1>Phone Number: {phoneNumber}</h1>
      <center>
      <h1 className="text-lg font-semibold break-words">
      Tickets:
      </h1>
      </center>
      {tickets
        .map((ticket) => (
        <center>
          <div className="w-200 max-w-xs shadow-md hover:bg-slate-100 flex flex-col flex-grow cursor-pointer">
            <h1>User ID: {ticket.User_ID}</h1>
            <h1>Ticket ID: {ticket.Ticket_ID}</h1>
            <h1>Seat ID: {ticket.Seat_ID}</h1>
            <h1> Showing ID: {ticket.Showing_ID}</h1>
          </div>
        </center>
        ))}
    </div>


  );
}

export default ViewProfile;
