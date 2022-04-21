import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./App.css";
import SelectMovie from "./routes/SelectMovie";
import SelectShowing from "./routes/SelectShowing";
import CreateMovie from "./routes/CreateMovie";
import DeleteMovie from "./routes/DeleteMovie";
import SelectSeats from "./routes/SelectSeats";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5914";

function App() {
  return (
    <Router>
      <div className="m-4">
        <Link to="/">
          <h1 className="text-4xl font-thin mb-4">The 310 Theatre</h1>
        </Link>
        <Switch>
          <Route exact path="/movies">
            <SelectMovie />
          </Route>
          <Route exact path="/showings">
            <SelectShowing movie_id={2} />
          </Route>
          <Route exact path="/create">
            <CreateMovie />
          </Route>
          <Route exact path="/delete">
            <DeleteMovie />
          </Route>
          <Route exact path="/seats">
            <SelectSeats room_id={100} />
          </Route>
          <Route path="/">
            <Link to="/movies">
              <h1 className="text-4xl hover:text-pink-700">Movies View</h1>
            </Link>
            <Link to="/showings">
              <h1 className="text-4xl hover:text-purple-700">Showings View</h1>
            </Link>
            <Link to="/create">
              <h1 className="text-4xl hover:text-amber-500">
                Create Movies View
              </h1>
            </Link>
            <Link to="/delete">
              <h1 className="text-4xl hover:text-lime-500">
                Delete Movies View
              </h1>
            </Link>
            <Link to="/seats">
              <h1 className="text-4xl hover:text-cyan-500">
                Select Seats View
              </h1>
            </Link>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
