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

app.get("/get", (req, res) => {
  connection.query("SELECT * FROM movies", (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

app.listen(port, () => {
  console.log("started server");
});
