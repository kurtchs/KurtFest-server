// const { Schema, model } = require("mongoose");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true
    },
      date: String,
      info: String,
      hour: String,
      location: String,
      totalAmount: Number,
      genre: {
        type:[String],
        enum:["Rock","Electronica"]
      },
      admin:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        require: true
      }
  })


const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
