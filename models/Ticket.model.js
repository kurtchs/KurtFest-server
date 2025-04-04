// const { Schema, model } = require("mongoose");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema(
  {
    username:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
        date: String,
        event:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
            required: true
        },
        hour: String,
        location: String,
        totalAmount: Number
  })


const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
