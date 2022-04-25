import axios from "axios";
import { useCallback, useState } from "react";
import { Link, useHistory } from "react-router-dom";

function LoginInfo({ setUser, setAdmin, setUsername }) {
  const [usernameField, setUsernameField] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [fieldError, setFieldError] = useState(false);
  const [credentialError, setCredentialError] = useState(false);

  const history = useHistory();
  const redirectHome = useCallback(() => history.push("/"), [history]);

  const handleSubmit = (event) => {
    event.preventDefault();

    setUsernameError(usernameField === "");
    setPasswordError(password === "");

    if (usernameField === "" || password === "") {
      setFieldError(true);
      setCredentialError(false);
    } else {
      setFieldError(false);
      axios
        .get("/users", {
          params: {
            username: usernameField,
          },
        })
        .then((res) => {
          const data = res.data[0];

          if (data.Password === password) {
            setCredentialError(false);
            setUser(data.User_ID);
            setAdmin(data.Admin_Status);
            setUsername(data.Username);
            redirectHome();
          } else {
            setCredentialError(true);
          }
        })
        .catch(() => {
          setCredentialError(true);
        });
    }
  };

  return (
    <form className="shadow-md p-4 space-y-2" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="username"
          className="block uppercase font-semibold tracking-wider"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          value={usernameField}
          onChange={(e) => setUsernameField(e.target.value)}
          className={`bg-gray-100 border border-gray-100 focus:bg-white outline-none p-2 rounded focus:border-gray-400 w-full ${
            usernameError ? "border-red-400" : ""
          }`}
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block uppercase font-semibold tracking-wider"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`bg-gray-100 border border-gray-100 focus:bg-white outline-none p-2 rounded focus:border-gray-400 w-full ${
            passwordError ? "border-red-400" : ""
          }`}
        />
      </div>
      {fieldError && (
        <p className="text-red-500 text-sm italic">
          You must fill out all fields.
        </p>
      )}
      {credentialError && (
        <p className="text-red-500 text-sm italic">Invalid credentials.</p>
      )}
      <div className="flex justify-between items-center">
        <input
          type="submit"
          value="Login"
          className="border text-violet-500 border-violet-500 hover:text-white hover:bg-violet-500 hover:shadow-md hover:shadow-violet-300 px-4 py-2 font-semibold rounded cursor-pointer"
        />
        <Link to="/signup">
          <p className="hover:text-violet-500 text-sm">Sign Up</p>
        </Link>
      </div>
    </form>
  );
}

function UserLogin({ setUser, setAdmin, setUsername }) {
  return (
    <div className="flex justify-center">
      <div className="w-96">
        <h1 className="text-3xl mb-4 uppercase font-thin">Login</h1>
        <LoginInfo
          setUser={setUser}
          setAdmin={setAdmin}
          setUsername={setUsername}
        />
      </div>
    </div>
  );
}

export default UserLogin;
