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
  host: "localhost",
  user: "root",
  password: "password",
  database: "db",
});

// connect to the database
connection.connect();

// display everything inside the movie_test table
// connection.query("SELECT * FROM movie_test", (error, results) => {
//   if (error) {
//     throw error;
//   }
//   console.log(results);
// });

app.get("/get", (req, res) => {
  connection.query("SELECT * FROM movie_test", (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

app.listen(port, () => {
  console.log("started server");
});
