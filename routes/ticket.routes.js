const router = require("express").Router();
const {verifyToken, verifyAdmin} = require("../middleware/auth.middlewares")
const Ticket = require("../models/Ticket.model")
const express = require("express")

router.get("/", verifyToken, async (req, res, next) => {
    try {
      const getTickets = await Event.find()
      res.status(200).json(getTickets)
    } catch (error) {
      next(error)
    }
  });

router.post("/",verifyToken , async (req, res, next) => {
  
    try {

       const savedTicket = await Ticket.create({
          username: req.body.username,
          date: req.body.date,
          event: req.body.event,
          hour: req.body.hour,
          location: req.body.location,
          totalAmount: req.body.totalAmount,
        })
        res.status(200).json(savedTicket) 
        
    } catch (error) {
        next(error)
    }

})

router.put("/:id",verifyToken, async (req, res, next) => {
  
    try {
        const {id} = req.params
       const updateTicket = await Ticket.findByIdAndUpdate(id ,  
        {
            username: req.body.username,
            date: req.body.date,
            event: req.body.event,
            hour: req.body.hour,
            location: req.body.location,
            totalAmount: req.body.totalAmount,
        }, {new: true}
    )
        res.status(200).json(updateTicket) 
        
    } catch (error) {
        next(error)
    }

})

router.delete("/:id",verifyToken, async (req, res, next) => {
  
    try {

        const response = await Ticket.findByIdAndDelete(req.params.id)
        res.json(response)
        
    } catch (error) {
        next(error)
    }
  
  })







module.exports = router