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

app.get("/movies", (req, res) => {
  connection.query("SELECT * FROM movies", (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

app.get("/rooms", (req, res) => {
  let id = req.query.room;

  connection.query(
    "select * from rooms where Room_ID = ?",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.send(results);
    }
  );
});

// reserved seats queue: select Seat_ID from showings inner join tickets on showings.Showing_ID = tickets.Showing_ID where showings.Showing_ID = ?
// TODO: make seats query for specific room
app.get("/seats", (req, res) => {
  let id = req.query.showing;

  connection.query(
    "select seats.Seat_ID, Type, case when showings.Showing_ID = tickets.Showing_ID then 1 else 0 end as Reserved from seats inner join showings on seats.Room_ID = showings.Room_ID left outer join tickets on seats.Seat_ID = tickets.Seat_ID where showings.Showing_ID = ?",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.send(results);
    }
  );
});
// app.get("/seats", (req, res) => {
//   connection.query("SELECT * FROM seats", (error, results) => {
//     if (error) {
//       throw error;
//     }
//     res.send(results);
//   });
// });

app.get("/reserved-seats-i-guess", (req, res) => {
  let id = req.query.showing;

  connection.query(
    "select Seat_ID from showings inner join tickets on showings.Showing_ID = tickets.Showing_ID where showings.Showing_ID = ?",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.send(results);
    }
  );
});

app.get("/showings", (req, res) => {
  let id = req.query.movie;

  connection.query(
    "select Showing_ID, showings.Room_ID, Name, Image_URL, Date_Time, IMAX from showings inner join movies on movies.Movie_ID = showings.Movie_ID inner join rooms on showings.Room_ID = rooms.Room_ID where showings.Movie_ID = ? order by Showing_ID",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.send(results);
    }
  );
});

app.get("/reviews", (req, res) => {
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

app.get("/records", (req, res) => {
  connection.query("SELECT * FROM viewing_record", (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

app.listen(port, () => {
  console.log("started server");
});
