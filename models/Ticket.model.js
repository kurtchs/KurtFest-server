const { Schema, model } = require("mongoose");

const ticketSchema = new Schema(
  {
    userName:{
        type: String,
        require: true
    },
        date: String,
        eventId: ObjectId,
        userId: ObjectId,
        hour: Number,
        location: String,
        totalAmount: Number
  })


const Ticket = model("Ticket", ticketSchema);

module.exports = Ticket;
