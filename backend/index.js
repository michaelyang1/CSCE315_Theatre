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
  let movie_name = req.query.Name
  let movie_length = req.query.Length
  let movie_primary_genre = req.query.Primary_Genre
  let movie_description = req.query.Description
  let movie_image_url = req.query.Image_URL

  if(movie_name == null || movie_length == null || movie_primary_genre == null || movie_description == null || movie_image_url == null) {
    throw "Invalid movie request"
  }

  let query_string = `insert into movies values (DEFAULT, ${movie_name}, ${movie_length}, ${movie_primary_genre}, ${movie_description}, ${movie_image_url})`
  connection.query(query_string, (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

app.post("/seats", (req, res) => {
  let seat_type = req.query.seat_type
  let room_id = req.query.room_id

  if(seat_type == null || room_id == null) {
    throw "Invalid seat request"
  }

  let query_string = `insert into seats values (DEFAULT, ${room_id}, ${seat_type})`
  connection.query(query_string, (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

app.post("/showings", (req, res) => {
  let movie_id = req.query.movie_id
  let room_id = req.query.room_id
  let showing_time = req.query.showing_time

  if(movie_id == null || room_id == null || showing_time == null) {
    throw "Invalid showings request"
  }

  let query_string = `insert into showings values (DEFAULT, ${movie_id}, ${room_id}, ${showing_time})`
  connection.query(query_string, (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

app.post("/theater_reviews", (req, res) => {
  let user_id = req.query.user_id
  let star_rating = req.query.star_rating
  let review = req.query.review
  let time_posted = req.query.time_posted

  if(user_id == null || star_rating == null || review == null || time_posted == null) {
    throw "Invalid theater_reviews request"
  }

  let query_string = `insert into theater_reviews values (DEFAULT, ${user_id}, ${star_rating}, ${review}, ${time_posted})`
  connection.query(query_string, (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

app.post("/tickets", (req, res) => {
  let user_id = req.query.user_id
  let star_rating = req.query.star_rating
  let review = req.query.review
  let time_posted = req.query.time_posted

  if(user_id == null || star_rating == null || review == null || time_posted == null) {
    throw "Invalid theater_reviews request"
  }

  let query_string = `insert into theater_reviews values (DEFAULT, ${user_id}, ${star_rating}, ${review}, ${time_posted})`
  connection.query(query_string, (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

app.post("/users", (req, res) => {
  let admin_status = req.query.admin_status
  let first_name = req.query.first_name
  let last_name = req.query.last_name
  let favorite_movie = req.query.favorite_movie
  let favorite_room = req.query.favorite_room
  let phone_number = req.query.phone_number
  let username = req.query.username
  let password = req.query.password

  if(admin_status == null || first_name == null || last_name == null || favorite_movie == null || favorite_room == null
    || phone_number == null || username == null || password == null) {
    throw "Invalid users request"
  }

  let query_string = `insert into users values (DEFAULT, ${admin_status}, ${first_name}, ${last_name}, ${favorite_movie}, ${phone_number},
    ${username}, ${password})`
  connection.query(query_string, (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

app.post("/viewing_record", (req, res) => {
  let user_id = req.query.user_id
  let showing_id = req.query.showing_id

  if(user_id == null || showing_id == null) {
    throw "Invalid viewing record request"
  }

  let query_string = `insert into viewing_record values (DEFAULT, ${user_id}, ${showing_id})`
  connection.query(query_string, (error, results) => {
    if (error) {
      throw error;
    }
    res.send(results);
  });
});

app.listen(port, () => {
  console.log("started server");
});
