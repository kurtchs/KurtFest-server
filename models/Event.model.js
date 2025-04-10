// const { Schema, model } = require("mongoose");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
      date: String,
      info: String,
      hour: String,
      location: String,
      totalAmount:{
        type: Number,
        required:true
      },
      genre: {
        type:[String],
        enum:["Rock","Electronica"]
      },
      admin:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      imageUrl: {
        type: String,
        required: false
      },
      
  })


const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
