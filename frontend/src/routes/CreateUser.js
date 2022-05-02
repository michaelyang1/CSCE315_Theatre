import { useState } from "react";
import ToggleButton from "../components/ToggleButton";
import axios from "axios";
import { useHistory } from "react-router-dom";

function CreateUser({ setUser, setDisplayName }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [favoriteMovie, setFavoriteMovie] = useState("");
  const [favoriteRoom, setFavoriteRoom] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const navigate = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      firstName === "" ||
      lastName === "" ||
      username === "" ||
      password === "" ||
      favoriteMovie === "" ||
      favoriteRoom === "" ||
      phoneNumber === ""
    ) {
      alert("Fill out all fields");
    } else {
      axios
        .post("/users", {
          adminStatus: 0,
          firstName: firstName,
          lastName: lastName,
          favoriteMovie: favoriteMovie,
          favoriteRoom: favoriteRoom,
          phoneNumber: phoneNumber,
          username: username,
          password: password,
        })
        .then(() => {
          navigate.push("/");
        })
        .catch(() => {
          alert("Unable to create user. Please try again.");
        });
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-1/4">
        <h1 className="text-3xl mb-4 uppercase font-thin">Sign Up</h1>
        <form
          onSubmit={handleSubmit}
          noValidate
          className="shadow-md p-4 space-y-2"
        >
          <div className="flex justify-between gap-4">
            <div className="w-1/2">
              <label
                htmlFor="firstName"
                className="uppercase font-semibold tracking-wider"
              >
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                id="firstName"
                required
                className="w-full bg-gray-100 border invalid:border-red-500 border-gray-100 focus:bg-white outline-none p-2 rounded focus:border-gray-400"
              />
            </div>
            <div className="w-1/2">
              <label
                htmlFor="lastName"
                className="uppercase font-semibold tracking-wider"
              >
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                id="lastName"
                required
                className="w-full bg-gray-100 border invalid:border-red-500 border-gray-100 focus:bg-white outline-none p-2 rounded focus:border-gray-400"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="username"
              className="uppercase font-semibold tracking-wider"
            >
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              id="username"
              required
              className="w-full bg-gray-100 border invalid:border-red-500 border-gray-100 focus:bg-white outline-none p-2 rounded focus:border-gray-400"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="uppercase font-semibold tracking-wider"
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              id="password"
              required
              className="w-full bg-gray-100 border invalid:border-red-500 border-gray-100 focus:bg-white outline-none p-2 rounded focus:border-gray-400"
            />
          </div>
          <div className="flex justify-between gap-4">
            <div className="w-3/5">
              <label
                htmlFor="favoriteMovie"
                className="uppercase font-semibold tracking-wider"
              >
                Favorite Movie
              </label>
              <input
                type="text"
                value={favoriteMovie}
                onChange={(e) => setFavoriteMovie(e.target.value)}
                placeholder="Favorite Movie"
                id="favoriteMovie"
                required
                className="w-full bg-gray-100 border invalid:border-red-500 border-gray-100 focus:bg-white outline-none p-2 rounded focus:border-gray-400"
              />
            </div>
            <div className="w-2/5">
              <label
                htmlFor="favoriteRoom"
                className="uppercase font-semibold tracking-wider"
              >
                Favorite Room
              </label>
              <input
                type="text"
                value={favoriteRoom}
                onChange={(e) => setFavoriteRoom(e.target.value)}
                placeholder="Favorite Room"
                id="favoriteRoom"
                required
                className="w-full bg-gray-100 border invalid:border-red-500 border-gray-100 focus:bg-white outline-none p-2 rounded focus:border-gray-400"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="uppercase font-semibold tracking-wider"
            >
              Phone Number
            </label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone Number"
              id="phoneNumber"
              required
              className="w-full bg-gray-100 border invalid:border-red-500 border-gray-100 focus:bg-white outline-none p-2 rounded focus:border-gray-400"
            />
          </div>
          <input
            type="submit"
            value="Sign Up"
            className="border text-neutral-800 border-neutral-800 hover:text-white hover:bg-neutral-800 hover:shadow-md hover:shadow-neutral-500 px-4 py-2 font-semibold rounded"
          />
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
