const express = require("express");
const bodyParser = require("body-parser");

// create express app
const app = express();

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

const Profiles = require("../models/profile.model");

// Create and Save a new Profile
app.post("/create-profile", (req, res) => {
  console.log(req.body);

  // Create a Profile
  const profile = new Profiles({
    name: req.body.name,
    id: req.body.id,
    Image: req.body.Image,
  });

  // Save Profile in the database
  profile
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
    message: "Profile added successfully",
    status: 0,
  });
});

// Retrive all profile details
app.get("/get-details", (req, res) => {
  Profiles.find()
    .then((profile) => {
      res.send(profile);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes.",
        status: 1,
      });
    });
});



// Update note
app.put("/update-profile", (req, res) => {
  // Find note and update it with the request body
  Profiles.findByIdAndUpdate(
    req.body._id,
    {
      Image: req.body.Image,
      name: req.body.name,
      id: req.body.id,
    },
    { new: true }
  )
    .then((profile) => {
      if (!profile) {
        return res.status(404).send({
          message: "Profile not found with id " + req.body._id,
          status: 1,
        });
      }
      res.send(profile);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Profile not found with id " + req.body.profileId,
          status: 1,
        });
      }
      return res.status(500).send({
        message: "Error updating profile with id " + req.body.profileId,
        status: 1,
      });
    });
});

// delete Profilei
app.delete("/delete-profile", (req, res) => {
  Profiles.findByIdAndRemove(req.body._id)
    .then((profile) => {
      console.log(profile);
      if (!profile) {
        return res.status(404).send({
          message: "Profile not found with id " + req.body._id,
          status: 1,
        });
      }
      res.send({ message: "Profile deleted successfully!", status: 0 });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Profile not found with id " + req.body._id,
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
