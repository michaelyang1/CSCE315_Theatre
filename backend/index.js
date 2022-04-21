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

  /*  connection.query(
    "SELECT * FROM showings WHERE Movie_ID = ?",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.send(results);
    }
  );
  */

  connection.query(
    "select Name, Image_URL, Date_Time from showings inner join movies on movies.Movie_ID = showings.Movie_ID where showings.Movie_ID = ?",
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
