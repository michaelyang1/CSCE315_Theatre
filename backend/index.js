const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const port = 5914;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// info used to establish database connection
var connection = mysql.createConnection({
  host: "csce10.cl6mb70f9rfe.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "csce310database*",
  database: "csce_310_project",
});

// connect to the database
connection.connect();

// GET METHODS
app.get("/movies", (req, res) => {
  connection.query("SELECT * FROM movies", (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

app.get("/rooms", (req, res) => {
  connection.query("SELECT * FROM rooms", (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

app.get("/seats", (req, res) => {
  connection.query("SELECT * FROM seats", (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

app.get("/showings", (req, res) => {
  let id = req.query.movie;

  connection.query(
    "select Name, Image_URL, Date_Time from showings inner join movies on movies.Movie_ID = showings.Movie_ID;",
    (error, results) => {
      if (error) {
        throw error;
      }
      res.send(results);
    }
  );
});

app.get("/theater_reviews", (req, res) => {
  connection.query("SELECT * FROM theater_reviews", (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

app.get("/tickets", (req, res) => {
  connection.query("SELECT * FROM tickets", (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

app.get("/users", (req, res) => {
  connection.query("SELECT * FROM users", (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

app.get("/viewing_record", (req, res) => {
  connection.query("SELECT * FROM viewing_record", (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

// POST REQUESTS
app.post("/movies", (req, res) => {
  const name = req.body.name;
  const length = req.body.length;
  const genre = req.body.genre;
  const desc = req.body.desc;
  const imageURL = req.body.imageURL;

  if (
    name == undefined ||
    length == undefined ||
    genre == undefined ||
    desc == undefined ||
    imageURL == undefined
  ) {
    throw "Invalid movie request";
  }

  const query = "insert into movies values (DEFAULT, ?, ?, ?, ?, ?)";
  connection.query(
    query,
    [name, length, genre, desc, imageURL],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.send(results);
    }
  );
});

app.post("/seats", (req, res) => {
  const seatID = req.body.seatID;
  const roomID = req.body.roomID;
  const seatType = req.body.seatType;

  if (seatID == undefined || roomID == undefined || seatType == undefined) {
    throw "Invalid seat request";
  }

  const query = "insert into seats values (?, ?, ?)";
  connection.query(query, [seatID, roomID, seatType], (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

app.post("/showings", (req, res) => {
  const movieID = req.body.movieID;
  const roomID = req.body.roomID;
  const time = req.body.time;

  if (movieID == undefined || roomID == undefined || time == undefined) {
    throw "Invalid showings request";
  }

  const query = "insert into showings values (DEFAULT, ?, ?, ?)";
  connection.query(query, [movieID, roomID, time], (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

app.post("/theater_reviews", (req, res) => {
  const userID = req.body.userID;
  const rating = req.body.rating;
  const review = req.body.review;
  const time = req.body.time;

  if (
    userID == undefined ||
    rating == undefined ||
    review == undefined ||
    time == undefined
  ) {
    throw "Invalid theater_reviews request";
  }

  const query = "insert into theater_reviews values (DEFAULT, ?, ?, ?, ?)";
  connection.query(query, [userID, rating, review, time], (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

app.post("/tickets", (req, res) => {
  const seatID = req.body.seatID;
  const userID = req.body.userID;
  const showingID = req.body.showingID;

  if (seatID == null || userID == null || showingID == null) {
    throw "Invalid tickets request";
  }

  const query = "insert into tickets values (DEFAULT, ?, ?, ?)";
  connection.query(query, [seatID, userID, showingID], (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

app.post("/users", (req, res) => {
  const adminStatus = req.body.adminStatus;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const favoriteMovie = req.body.favoriteMovie;
  const favoriteRoom = req.body.favoriteRoom;
  const phoneNumber = req.body.phoneNumber;
  const username = req.body.username;
  const password = req.body.password;

  if (
    adminStatus == null ||
    firstName == null ||
    lastName == null ||
    favoriteMovie == null ||
    favoriteRoom == null ||
    phoneNumber == null ||
    username == null ||
    password == null
  ) {
    throw "Invalid users request";
  }

  const query = "insert into users values (DEFAULT, ?, ?, ?, ?, ?, ?, ?, ?)";
  connection.query(
    query,
    [
      adminStatus,
      firstName,
      lastName,
      favoriteMovie,
      favoriteRoom,
      phoneNumber,
      username,
      password,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.send(results);
    }
  );
});

app.post("/viewing_record", (req, res) => {
  const userID = req.body.userID;
  const showingID = req.body.showingID;

  if (userID == null || showingID == null) {
    throw "Invalid viewing record request";
  }

  const query = "insert into viewing_record values (DEFAULT, ?, ?)";
  connection.query(query, [userID, showingID], (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

app.listen(port, () => {
  console.log("started server");
});
