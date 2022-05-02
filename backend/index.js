// app dependency requirements
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

// backend server using express.js
const app = express();
const port = 5914;

// to use json request body for post methods
app.use(cors());
app.use(express.json());
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

// GET METHODS (API methods to retrieve information about our theatre)
// Contributed by Anubhav Aryal, as part of the Select Movie and Create Ticket feature set (Feature Set 3)
app.get("/movies", (req, res) => {
  const query = "SELECT * FROM movies";
  connection.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

app.get("/rooms", (req, res) => {
  const id = req.query.room;
  const query = "SELECT * FROM rooms WHERE Room_ID = ?";
  connection.query(query, [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

app.get("/seats", (req, res) => {
  const id = req.query.showing;

  const query =
    "SELECT seats.Seat_ID, CASE WHEN seats.Seat_ID = tickets.Seat_ID THEN 1 ELSE 0 END AS Reserved FROM showings INNER JOIN seats ON showings.Room_ID = seats.Room_ID LEFT OUTER JOIN tickets ON showings.Showing_ID = tickets.Showing_ID AND seats.Seat_ID = tickets.Seat_ID WHERE showings.Showing_ID = ?";
  connection.query(query, [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

app.get("/showings", (req, res) => {
  const id = req.query.movie;

  const query =
    "SELECT Showing_ID, showings.Room_ID, Name, Image_URL, Date_Time, IMAX FROM showings INNER JOIN movies ON movies.Movie_ID = showings.Movie_ID INNER JOIN rooms ON showings.Room_ID = rooms.Room_ID WHERE showings.Movie_ID = ? ORDER BY Showing_ID";
  connection.query(query, [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

// this is used by ConfirmTicket to get all movie/showing information from just showing id
app.get("/temp-showings", (req, res) => {
  const id = req.query.showing;

  const query =
    "SELECT Showing_ID, showings.Room_ID, Name, Length, Primary_Genre, Description, Image_URL, Date_Time, IMAX FROM showings INNER JOIN movies ON movies.Movie_ID = showings.Movie_ID INNER JOIN rooms ON showings.Room_ID = rooms.Room_ID WHERE Showing_ID = ?";
  connection.query(query, [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

// Contributed by David Erdner, as part of the Create Theater Review feature set (Feature Set 4)
app.get("/reviews", (req, res) => {
  // retrieve the theatre reviews by latest time
  const query = "select * from theater_reviews order by Time_Posted desc";
  connection.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

app.get("/tickets", (req, res) => {
  const query = "SELECT * FROM tickets";
  connection.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

// Contributed by Nadxhieli Juarez as part of the Login for User/Admin feature set (Feature Set 1)
app.get("/users", (req, res) => {
  const id = req.query.id;

  if (id === undefined) {
    const query = "SELECT * FROM users";
    connection.query(query, (error, results) => {
      if (error) {
        throw error;
      }
      res.send(results);
    });
  } else {
    const query = "SELECT * FROM users WHERE User_ID = ?";
    connection.query(query, [id], (error, results) => {
      if (error) {
        throw error;
      }
      res.send(results);
    });
  }
});

app.get("/records", (req, res) => {
  const query = "SELECT * FROM viewing_record";
  connection.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

// POST REQUESTS
// these are the api methods which we use to create new rows (tuples) into the respective tables (dependent on the api routes)
// Contributed by Michael Yang as part of the Movie Create and Delete feature set (Feature Set 2)
app.post("/movies", (req, res) => {
  // retrieve information from the request body (the body names must identically match the json parameter names)
  const name = req.body.name;
  const length = req.body.length;
  const genre = req.body.genre;
  const desc = req.body.desc;
  const imageURL = req.body.imageURL;

  // if any of the fields are undefined (i.e. not supplied in the request), we throw an error
  if (
    name == undefined ||
    length == undefined ||
    genre == undefined ||
    desc == undefined ||
    imageURL == undefined
  ) {
    throw "Invalid movie request";
  }

  // otherwise, we insert the row into the table
  const query = "INSERT INTO movies VALUES (default, ?, ?, ?, ?, ?)";
  // we use the '?' to prevent sql injection attacks when supplying the query arguments
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

app.post("/rooms", (req, res) => {
  const Room_ID = req.body.Room_ID;
  const Capacity = req.body.Capacity;
  const IMAX = req.body.IMAX;

  console.log("bruh");

  if (Room_ID == undefined || Capacity == undefined || IMAX == undefined) {
    throw "Invalid reviews request";
  }

  const query = "INSERT INTO rooms VALUES (?, ?, ?)";
  connection.query(query, [Room_ID, Capacity, IMAX], (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

app.post("/seats", (req, res) => {
  const roomID = parseInt(req.body.roomID);
  const capacity = req.body.capacity;

  if (roomID == undefined || capacity == undefined) {
    throw "Invalid seat request";
  }

  const query = "INSERT INTO seats (Seat_ID, Room_ID) VALUES ?";
  const values = [];

  for (let i = 0; i < capacity; i++) {
    values.push([roomID + i, roomID]);
  }

  connection.query(query, [values], (error, results) => {
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

  const query = "INSERT INTO showings VALUES (default, ?, ?, ?)";
  connection.query(query, [movieID, roomID, time], (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

// Contributed by David Erdner, as part of the Create Theater Review feature set (Feature Set 4)
app.post("/reviews", (req, res) => {
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
    throw "Invalid reviews request";
  }

  const query = "INSERT INTO theater_reviews VALUES (default, ?, ?, ?, ?)";
  connection.query(query, [userID, rating, review, time], (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

// Contributed by Anubhav Aryal, as part of the Select Movie and Create Ticket feature set (Feature Set 3)
app.post("/tickets", (req, res) => {
  const seatID = req.body.seatID;
  const userID = req.body.userID;
  const showingID = req.body.showingID;

  if (seatID == undefined || userID == undefined || showingID == undefined) {
    throw "Invalid tickets request";
  }

  const query = "INSERT INTO tickets VALUES (default, ?, ?, ?)";
  connection.query(query, [seatID, userID, showingID], (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

// Contributed by Nadxhieli Juarez as part of the Login for User/Admin feature set (Feature Set 1)
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
    adminStatus == undefined ||
    firstName == undefined ||
    lastName == undefined ||
    favoriteMovie == undefined ||
    favoriteRoom == undefined ||
    phoneNumber == undefined ||
    username == undefined ||
    password == undefined
  ) {
    throw "Invalid users request";
  }

  const query = "INSERT INTO users VALUES (default, ?, ?, ?, ?, ?, ?, ?, ?)";
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

app.post("/records", (req, res) => {
  const userID = req.body.userID;
  const showingID = req.body.showingID;

  if (userID == undefined || showingID == undefined) {
    throw "Invalid records request";
  }

  const query = "INSERT INTO viewing_record VALUES (default, ?, ?)";
  connection.query(query, [userID, showingID], (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

// DELETE REQUESTS
// These are the api methods used to delete rows from table based off select attributes (e.g. id)
// Contributed by Michael Yang as part of the Movie Create and Delete feature set (Feature Set 2)
app.delete("/movies", (req, res) => {
  const movie_id = req.body.movieID;

  if (movie_id == undefined) {
    throw "Invalid movie delete request";
  }

  let query_string = `DELETE FROM movies WHERE Movie_ID = ?`;
  // let query_string =
  //   "DELETE movies, showings, tickets FROM showings INNER JOIN tickets ON showings.Showing_ID = tickets.Showing_ID INNER JOIN movies on showings.Movie_ID = movies.Movie_ID WHERE movies.Movie_ID = ?";
  connection.query(query_string, [movie_id], (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

app.delete("/rooms", (req, res) => {
  const room_id = req.body.roomID;

  if (room_id == undefined) {
    throw "Invalid room delete request";
  }

  let query_string = `DELETE FROM rooms WHERE Room_ID = ?`;
  connection.query(query_string, [room_id], (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

app.delete("/seats", (req, res) => {
  const seat_id = req.body.seatID;

  if (seat_id == undefined) {
    throw "Invalid seat delete request";
  }

  let query_string = `DELETE FROM seats WHERE Seat_ID = ?`;
  connection.query(query_string, [seat_id], (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

app.delete("/showings", (req, res) => {
  const showing_id = req.body.showingID;

  if (showing_id == undefined) {
    throw "Invalid showing delete request";
  }

  let query_string = `DELETE FROM showings WHERE Showing_ID = ?`;
  connection.query(query_string, [showing_id], (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

app.delete("/reviews", (req, res) => {
  const review_id = req.body.reviewID;

  if (review_id == undefined) {
    throw "Invalid review delete request";
  }

  let query_string = `DELETE FROM theater_reviews WHERE Review_ID = ?`;
  connection.query(query_string, [review_id], (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

app.delete("/tickets", (req, res) => {
  const ticket_id = req.body.ticketID;

  if (ticket_id == undefined) {
    throw "Invalid ticket delete request";
  }

  let query_string = `DELETE FROM tickets WHERE Ticket_ID = ?`;
  connection.query(query_string, [ticket_id], (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

app.delete("/users", (req, res) => {
  const user_id = req.body.userID;

  if (user_id == undefined) {
    throw "Invalid user delete request";
  }

  let query_string = `DELETE FROM users WHERE User_ID = ?`;
  connection.query(query_string, [user_id], (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

app.delete("/records", (req, res) => {
  const record_id = req.body.recordID;

  if (record_id == undefined) {
    throw "Invalid viewing record delete request";
  }

  let query_string = `DELETE FROM viewing_record WHERE Record_ID = ?`;
  connection.query(query_string, [record_id], (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

// start the server on the specified port to listen for requests
app.listen(port, () => {
  console.log("started server");
});
