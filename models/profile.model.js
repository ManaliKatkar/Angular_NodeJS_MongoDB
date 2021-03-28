const mongoose = require("mongoose");

const ProfileSchema = mongoose.Schema(
  {
    Image: String,
    name: String,
    id: Number
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Profile", ProfileSchema);
