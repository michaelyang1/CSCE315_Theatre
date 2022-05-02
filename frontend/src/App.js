import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";
import "./App.css";
import SelectMovie from "./routes/SelectMovie";
import SelectShowing from "./routes/SelectShowing";
import CreateMovie from "./routes/CreateMovie";
import DeleteMovie from "./routes/DeleteMovie";
import SelectSeats from "./routes/SelectSeats";
import SelectUsers from "./routes/SelectUsers";
import CreateReview from "./routes/CreateReview";
import ConfirmTicket from "./routes/ConfirmTicket";
import CreateRooms from "./routes/CreateRooms";
import CreateUser from "./routes/CreateUser";
import axios from "axios";
import { useState } from "react";
import Login from "./routes/Login";

axios.defaults.baseURL = "http://localhost:5914";

function App() {
  const [user, setUser] = useState(0);
  const [username, setUsername] = useState("");
  const [admin, setAdmin] = useState(false);
  const [movie, setMovie] = useState(0);
  const [showing, setShowing] = useState(0);
  const [room, setRoom] = useState(0);
  const [seats, setSeats] = useState([]);

  return (
    <Router>
      <div className="m-4 font-open">
        <div className="flex justify-between mb-4 items-center">
          <Link to="/">
            <h1 className="text-4xl font-thin">The 310 Theatre</h1>
          </Link>
          <h1 className="text-3xl font-thin">{username}</h1>
        </div>
        <Switch>
          <Route exact path="/movies">
            <SelectMovie setMovie={setMovie} />
          </Route>
          <Route exact path="/showings">
            <SelectShowing
              movieID={movie}
              setShowing={setShowing}
              setRoom={setRoom}
            />
          </Route>
          <Route exact path="/createUser">
            <CreateUser setUser={setUser} setDisplayName={setUsername} />
          </Route>
          <Route exact path="/create">
            <CreateMovie />
          </Route>
          <Route exact path="/delete">
            <DeleteMovie />
          </Route>
          <Route exact path="/seats">
            <SelectSeats
              roomID={room}
              showingID={showing}
              selectedSeats={seats}
              setSelectedSeats={setSeats}
            />
          </Route>
          <Route exact path="/users">
            <SelectUsers />
          </Route>
          <Route exact path="/reviews">
            <CreateReview user={user} username={username} />
          </Route>
          <Route exact path="/rooms">
            <CreateRooms user={user} />
          </Route>
          <Route exact path="/confirm">
            <ConfirmTicket userID={user} showingID={showing} seatIDS={seats} />
          </Route>

          <Route exact path="/">
            {!user ? (
              <Login
                setUser={setUser}
                setDisplayName={setUsername}
                setAdmin={setAdmin}
              />
            ) : admin ? (
              <Redirect to="/adminLanding" />
            ) : (
              <Redirect to="/userLanding" />
            )}
          </Route>

          <Route exact path="/userLanding">
            <div>
              <Link to="/movies">
                <h1 className="text-4xl hover:text-pink-500">Select Movie</h1>
              </Link>
            </div>
            <div>
              <Link to="/reviews">
                <h1 className="text-4xl hover:text-yellow-400">
                  Create Review
                </h1>
              </Link>
            </div>
          </Route>

          <Route path="/adminLanding">
            <div className="flex gap-8 font-thin">
              <div>
                <Link to="/create">
                  <h1 className="text-4xl hover:text-orange-300">
                    Create Movie
                  </h1>
                </Link>
                <Link to="/delete">
                  <h1 className="text-4xl hover:text-lime-500">Delete Movie</h1>
                </Link>
              </div>
              <div>
                <Link to="/users">
                  <h1 className="text-4xl hover:text-purple-600">
                    Select User
                  </h1>
                </Link>
              </div>
              <div>
                <Link to="/rooms">
                  <h1 className="text-4xl hover:text-purple-600">
                    Create Room
                  </h1>
                </Link>
              </div>

            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
