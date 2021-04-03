const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// create express app
const app = express();

// add cors dependancy
app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// Configuring the database
const dbConfig = require("../config/database.config");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.set("useFindAndModify", false);

// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

const MovieSeatBooking = require("../models/movie_seat_booking.model");

// Create and Save a new movieSeatBooking
app.post("/book-movie-seat", (req, res) => {
  // Create a movieSeatBooking
  const movieSeatBooking = new MovieSeatBooking({
    seat_code: req.body.seat_code,
    availability: req.body.availability,
    type_of_seat: req.body.type_of_seat,
    swachh_bharat_cess: req.body.swachh_bharat_cess,
    krishi_kalyan_cess: req.body.krishi_kalyan_cess,
    rate: req.body.rate,
  });

  // Save movieSeatBooking in the database
  movieSeatBooking
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Note.",
        status: 1,
      });
    });

  res.json({
    message: "Movie Seat Booking done successfully",
    status: 0,
  });
});

// Retrive all movieSeatBooking details
app.get("/get-movie-seat-details", (req, res) => {
  MovieSeatBooking.find()
    .then((movieSeatBooking) => {
      res.send(movieSeatBooking);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes.",
        status: 1,
      });
    });
});

// Update note
app.put("/update-movie-seats", (req, res) => {
  // Find note and update it with the request body
  const filter = {
    availability: true,
  };

  const updatedData = {
    availability: false,
  };

  MovieSeatBooking.updateMany(filter, updatedData)
    .then((movieSeatBooking) => {
      res.send({
        message: "Movie Seat updated successfully!",
        status: 0,
      });
    })
    .catch((err) => {
      res.send({
        message: "Something wrong!",
        status: 1,
      });
    });
});

// delete movieSeatBookingi
app.delete("/delete-movie-seat", (req, res) => {
  MovieSeatBooking.findByIdAndRemove(req.body._id)
    .then((movieSeatBooking) => {
      if (!movieSeatBooking) {
        return res.status(404).send({
          message: "Movie Seat not found with id " + req.body._id,
          status: 1,
        });
      }
      res.send({ message: "Movie Seat deleted successfully!", status: 0 });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "movieSeatBooking not found with id " + req.body._id,
          status: 1,
        });
      }
      return res.status(500).send({
        message: "Could not delete note with id " + req.body._id,
        status: 1,
      });
    });
});

// listen for requests
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
