const router = require("express").Router();
const {verifyToken, verifyAdmin} = require("../middleware/auth.middlewares")
const Event = require("../models/Event.model")
const express = require("express")
const cloudinary = require("../config/cloudinary")
const multer = require("multer")


//configuracion multer para guardar imagenes

const storage = multer.memoryStorage()

const upload = multer({ storage: storage})


  
  //Ruta crud evento

  router.get("/", verifyToken, async (req, res, next) => {
    try {
      const getEvents = await Event.find().populate("admin", "username")
      res.status(200).json(getEvents)
    } catch (error) {
      next(error)
    }
  });

  router.get("/:eventId", verifyToken, async (req, res, next) => {
    try {

      const getEvent = await Event.findById(req.params.eventId).populate("admin", "username")
      if(!getEvent){
        return res.status(404).json({errorMessage: "No se encontro evento"})
      }
      res.status(200).json(getEvent)
    } catch (error) {
      next(error)
    }
  });

  router.post("/addevent/",verifyToken, verifyAdmin, upload.single("image"), async (req, res) => {

        // TODO clausula de guardia que busque un evento por ese nombrem y si ya existe, envie un error. Porque el nombre es unico. igual que el signup.
  
      try {

        if (req.file) {
          cloudinary.uploader.upload_stream( 
              { resource_type: "auto" }, 
              async (error, result) => { 
                  if (error) {
                      return res.status(500).json({ errorMessage: "Error al subir la imagen." });
                  }
    
                  // console.log("Event data:", {
                  //   name: req.body.name,
                  //   date: req.body.date,
                  //   info: req.body.info,
                  //   hour: req.body.hour,
                  //   location: req.body.location,
                  //   totalAmount: req.body.totalAmount,
                  //   genre: req.body.genre,
                  //   imageUrl: result.secure_url,  
                  // });
    
                  const newEvent = await Event.create({
                    name: req.body.name,
                    date: req.body.date,
                    info: req.body.info,
                    hour: req.body.hour,
                    location: req.body.location,
                    totalAmount: req.body.totalAmount,
                    genre: req.body.genre,
                    imageUrl: result.secure_url,
                    admin: req.payload._id
                  });
    
                  res.status(200).json(newEvent); 
              }
          ).end(req.file.buffer); 
        } else {
          res.status(400).json({ errorMessage: "No image provided" });
        }
      } catch (error) {
        console.log("Error creando evento:", error);
        res.status(500).json({ errorMessage: "Error al crear el evento" });
      }
    });

  router.put("/editevent/:eventId",verifyToken, verifyAdmin, upload.single("image"),  async (req, res, next) => {

    // TODO clausula de guardia que busque un evento por ese nombrem y si ya existe, envie un error. Porque el nombre es unico. igual que el signup.

    // console.log(req.body)

    const {eventId} = req.params
    try {
    //mantiene la url anterior si no se sube nada nuevo
    let imageUrl = req.body.imageUrl

    // si se sube una nueva imagen la subimos a cloudinary
    if(req.file) {
      // console.log("imagen recibida", req.file)
      try {
      
        //Promise es una forma de manejar acciones que toman tiempo como subir una imagen, resolve significa todo bien y reject el fallo 
        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { resource_type: "auto" },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
            //El buffer es una estructura de Node.js que guarda datos binarios (como una imagen)
          ).end(req.file.buffer); 
        });
            imageUrl = result.secure_url
            
        } catch (error) {
            return res.status(500).json({errorMessage: "Error al subir la imagen."})
        }
    }

       const updateEvent = await Event.findByIdAndUpdate(eventId ,  
        {
        
          name: req.body.name,
          date: req.body.date,
          info: req.body.info,
          hour: req.body.hour,
          location: req.body.location,
          totalAmount: req.body.totalAmount,
          genre: req.body.genre,
          imageUrl: imageUrl
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