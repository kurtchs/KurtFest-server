// ℹ️ Loads environment variables from a .env file into process.env
process.loadEnvFile()

// ℹ️ Establishes a connection to the database
require("./db");

// Imports Express (a Node.js framework for handling HTTP requests) and initializes the server
const express = require("express");
const app = express();

// ℹ️ Loads and applies global middleware (CORS, JSON parsing, etc.) for server configurations
const config = require("./config")
config(app);

//Rutas pruebas
app.get("/", (req, res, next) => {
  res.json({ messege:"conexión funcionando"})
})

app.get("/events/", (req, res, next) => {
  res.json({ messege:"conexión funcionando"})
})

app.get("/events/:eventId", (req, res, next) => {
  res.json({ messege:"conexión funcionando"})
})

app.get("/profile/:userId", (req, res, next) => {
  res.json({ messege:"conexión funcionando"})
})

//Ruta crud evento
app.post("/eventcreate", (req, res) => {

  
  Event.create({
    name: req.body.name,
    date: req.body.date,
    info: req.body.info,
    hour: req.body.number,
    location: req.body.location,
    totalAmount: req.body.totalAmount,
    genre: req.body.genre
    // adminId: ObjectId
  })
  .then(() => {
    
    res.json("creando evento")
  })
  .catch((error) => {
    console.log(error)
  })

})

app.get("/events", async (req, res) => {
  try {
    const response = await Event.find();
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener los eventos" });
  }
});

app.delete("/events/:eventId", (req, res) => {

  Event.findByIdAndDelete(req.params.eventId)
  .then(() => {
    res.json("evento eliminado")
  })
  .catch((error) => {
    console.log(error)
  })

})

app.put("/events/:eventId", async (req, res) => {
  try {

    const response = await Event.findByIdAndUpdate(req.params.eventId, {
      name: req.body.name,
      date: req.body.date,
      info: req.body.info,
      hour: req.body.number,
      location: req.body.location,
      totalAmount: req.body.totalAmount,
      genre: req.body.genre
      // adminId: ObjectId
    }, {new: true}
  )

    res.json(response)
    
  } catch (error) {
    console.log(error)
    
  }
})

// 👇 Defines and applies route handlers
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

// ❗ Centralized error handling (must be placed after routes)
const handleErrors = require("./errors")
handleErrors(app);

// ℹ️ Defines the server port (default: 5005)
const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`Server listening. Local access on http://localhost:${PORT}`);
});
