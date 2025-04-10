const router = require("express").Router();
const {verifyToken} = require("../middleware/auth.middlewares")
const Ticket = require("../models/Ticket.model")


router.get("/user/:userId", verifyToken, async (req, res, next) => {
    try {
      const getTickets = await Ticket.find({ username: req.params.userId }).populate("event", "name date hour").populate("username", "username")
      res.status(200).json(getTickets)
    } catch (error) {
      next(error)
    }
  });

router.post("/",verifyToken , async (req, res, next) => {
  
    try {

        console.log(req);
        console.log(res);

       const savedTicket = await Ticket.create({
          username: req.payload._id,
          date: req.body.date,
          event: req.body._id,
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
        console.log("ID recibido:", req.params.id)
        const response = await Ticket.findByIdAndDelete(req.params.id)
        if (response){
            res.status(200).json({message: "Ticket deleted"})
        } else {
            res.status(404).json({message: "Ticket not found"})
        }
        
    } catch (error) {
        next(error)
    }
  
  })







module.exports = router