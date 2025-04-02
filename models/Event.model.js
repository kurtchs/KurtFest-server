const { Schema, model } = require("mongoose");

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
      admin: String
  })


const Event = model("Event", eventSchema);

module.exports = Event;
