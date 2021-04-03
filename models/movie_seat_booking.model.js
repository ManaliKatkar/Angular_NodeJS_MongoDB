const mongoose = require("mongoose");

const MovieSeatBooking = mongoose.Schema(
  {
    id: Number,
    seat_code: {
      type: String,
      unique: true,
    },
    availability: {
      type: Boolean,
      default: true
    },
    type_of_seat: {
      type: String,
      enum: ["Platinum", "Gold", "Silver"],
    },
    type_of_show: {
      type: String,
      enum: ["Show 1", "Show 2", "Show 3"],
    },
    swachh_bharat_cess: {
      type: Number,
      default: 0.14,
    },
    krishi_kalyan_cess:{
      type: Number,
      default: 0.5,
    },
    rate: {
      type: Number,
      enum: [320, 280, 240],
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MovieSeatBooking", MovieSeatBooking);
