import React, { useState, useEffect } from "react";
import "./Login.css";
import ToggleButton from "../components/ToggleButton";
import { useHistory } from "react-router-dom";
import axios from "axios";

// Contributed by Nadxhieli Juarez as part of the Login for User/Admin feature set (Feature Set 1)
function Login({ setUser, setDisplayName, setAdmin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(0);
  const [users, setUsers] = useState([]);

  const navigate = useHistory();

  useEffect(() => {
    axios.get("/users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  const user = users.find(
    (user) =>
      user.Username === username &&
      user.Password === password &&
      user.Admin_Status === status
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    if (user !== undefined) {
      setUser(user.User_ID);
      setDisplayName(username);
      setAdmin(status ? true : false);
      navigate.push(status ? "/adminLanding" : "/userLanding");
    } else {
      alert("Invalid login, check status, username and password");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-1/4">
        <h1 className="text-3xl mb-4 uppercase font-thin">Login</h1>
        <form
          onSubmit={handleSubmit}
          noValidate
          className="shadow-md p-4 space-y-2"
        >
          <div className="flex justify-between flex-1">
            <div>
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
            </div>
            <div className="flex flex-col gap-2 items-center justify-center flex-1">
              {
                <p className="uppercase font-semibold tracking-wider">
                  {status ? "Admin" : "User"}
                </p>
              }
              <ToggleButton onToggle={() => setStatus((s) => s ^ 1)} />
            </div>
          </div>
          <input
            type="submit"
            value="Login"
            className="border text-neutral-800 border-neutral-800 hover:text-white hover:bg-neutral-800 hover:shadow-md hover:shadow-neutral-500 px-4 py-2 font-semibold rounded"
          />
        </form>
      </div>
    </div>
  );
}

export default Login;
