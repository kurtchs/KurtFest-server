const { Schema, model } = require("mongoose");

const ticketSchema = new Schema(
  {
    username:{
        type: String,
        require: true
    },
        date: String,
        event: String,
        hour: String,
        location: String,
        totalAmount: Number
  })


const Ticket = model("Ticket", ticketSchema);

module.exports = Ticket;
