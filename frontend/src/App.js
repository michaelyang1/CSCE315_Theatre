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
import UserLogin from "./routes/UserLogin";
import axios from "axios";
import { useState } from "react";
import { BiMoviePlay } from "react-icons/bi";

axios.defaults.baseURL = "http://localhost:5914";

function App() {
  const [admin, setAdmin] = useState(0);
  const [username, setUsername] = useState("");

  const [user, setUser] = useState(0);
  const [movie, setMovie] = useState(0);
  const [showing, setShowing] = useState(0);
  const [room, setRoom] = useState(0);
  const [seats, setSeats] = useState([]);

  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <Router>
      <div className="m-4 font-open">
        <div className="flex justify-between mb-4">
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
            <CreateReview />
          </Route>
          <Route exact path="/confirm">
            <ConfirmTicket userID={user} showingID={showing} seatIDS={seats} />
          </Route>
          <Route exact path="/login">
            <UserLogin
              setUser={setUser}
              setAdmin={setAdmin}
              setUsername={setUsername}
            />
          </Route>
          <Route path="/">
            <div className="flex gap-8 font-thin justify-around">
              <div>
                <Link to="/login">
                  <h1 className="text-4xl hover:text-red-500">Login</h1>
                </Link>
              </div>
              <div>
                <Link to="/movies">
                  <h1 className="text-4xl hover:text-orange-500">
                    Select Movie
                  </h1>
                </Link>
                <Link to="/create">
                  <h1 className="text-4xl hover:text-yellow-300">
                    Create Movie
                  </h1>
                </Link>
                <Link to="/delete">
                  <h1 className="text-4xl hover:text-green-500">
                    Delete Movie
                  </h1>
                </Link>
              </div>
              <div>
                <Link to="/users">
                  <h1 className="text-4xl hover:text-blue-500">Select User</h1>
                </Link>
              </div>
              <div>
                <Link to="/reviews">
                  <h1 className="text-4xl hover:text-purple-500">
                    Create Review
                  </h1>
                </Link>
              </div>
            </div>
            <BiMoviePlay className="w-1/4 h-auto animate-[spin_3s_linear_infinite] bg-gradient-to-r from-red-500 to-blue-500 ml-auto mr-auto rounded-full p-12" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
