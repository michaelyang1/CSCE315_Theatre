import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./App.css";
import SelectMovie from "./routes/SelectMovie";
import SelectShowing from "./routes/SelectShowing";
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
            <SelectShowing
              movie={{
                Movie_ID: 2,
                Name: "Inception",
                Length: 148,
                Primary_Genre: "Action",
                Description:
                  "Written and Directed by Christopher Nolan in 2010. Staring Leonardo Dicaprio.",
                Image_URL:
                  "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg",
              }}
            />
          </Route>
          <Route path="/">
            <Link to="/movies">
              <h1 className="text-4xl mb-4 hover:text-pink-700">Movies View</h1>
            </Link>
            <Link to="/showings">
              <h1 className="text-4xl hover:text-purple-700">Showings View</h1>
            </Link>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
