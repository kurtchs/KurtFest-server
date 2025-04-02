const router = require("express").Router();
const {verifyToken, verifyAdmin} = require("../middleware/auth.middlewares")
const Event = require("../models/Event.model")
const express = require("express")

//Rutas pruebas
// router.get("/", (req, res, next) => {
//     res.json({ messege:"conexión funcionando"})
//   })
  
//   app.get("/events/", (req, res, next) => {
//     res.json({ messege:"conexión funcionando"})
//   })
  
//   app.get("/events/:eventId", (req, res, next) => {
//     res.json({ messege:"conexión funcionando"})
//   })
  
//   app.get("/profile/:userId", (req, res, next) => {
//     res.json({ messege:"conexión funcionando"})
//   })
  
  //Ruta crud evento

  router.get("/", verifyToken, async (req, res, next) => {
    try {
      const getEvents = await Event.find()
      res.status(200).json(getEvents)
    } catch (error) {
      next(error)
    }
  });

  router.post("/",verifyToken, verifyAdmin, async (req, res, next) => {
  
      try {
  
         const savedEvent = await Event.create({
            name: req.body.name,
            date: req.body.date,
            info: req.body.info,
            hour: req.body.hour,
            location: req.body.location,
            totalAmount: req.body.totalAmount,
            genre: req.body.genre,
            admin: req.body.admin
          })
          res.status(200).json(savedEvent) 
          
      } catch (error) {
          next(error)
      }
  
  })

  router.put("/:id",verifyToken, verifyAdmin,  async (req, res, next) => {
  
    try {
        const {id} = req.params
       const updateEvent = await Event.findByIdAndUpdate(id ,  
        {
        
          name: req.body.name,
          date: req.body.date,
          info: req.body.info,
          hour: req.body.hour,
          location: req.body.location,
          totalAmount: req.body.totalAmount,
          genre: req.body.genre,
          admin: req.body.admin
        }, {new: true}
    )
        res.status(200).json(updateEvent) 
        
    } catch (error) {
        next(error)
    }

})
  
//   app.get("/events", async (req, res) => {
//     try {
//       const response = await Event.find();
//       res.json(response);
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ error: "Error al obtener los eventos" });
//     }
//   });
  
  router.delete("/:id",verifyToken, verifyAdmin, async (req, res, next) => {
  
    try {

        const response = await Event.findByIdAndDelete(req.params.id)
        res.json(response)
        
    } catch (error) {
        next(error)
    }
  
  })
  
//   app.put("/events/:eventId", async (req, res) => {
//     try {
  
//       const response = await Event.findByIdAndUpdate(req.params.eventId, {
//         name: req.body.name,
//         date: req.body.date,
//         info: req.body.info,
//         hour: req.body.number,
//         location: req.body.location,
//         totalAmount: req.body.totalAmount,
//         genre: req.body.genre
//         // admin: ObjectId
//       }, {new: true}
//     )
  
//       res.json(response)
      
//     } catch (error) {
//       console.log(error)
      
//     }
//   })

module.exports = router