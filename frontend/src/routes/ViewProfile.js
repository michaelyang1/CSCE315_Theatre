import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ViewProfile() {
  const { id } = useParams();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [favoriteMovie, setFavoriteMovie] = useState("");
  const [favoriteRoom, setFavoriteRoom] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

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

  return (
    <div className="font-mono">
      <h1>First Name: {firstName}</h1>
      <h1>Last Name: {lastName}</h1>
      <h1>Username: {username}</h1>
      <h1>Password: {password}</h1>
      <h1>Favorite Movie: {favoriteMovie}</h1>
      <h1>Favorite Room: {favoriteRoom}</h1>
      <h1>Phone Number: {phoneNumber}</h1>
    </div>
  );
}

export default ViewProfile;
