const router = require("express").Router();


router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRouter = require("./auth.routes")
router.use("/auth", authRouter)

const userRouter = require("./user.routes")
router.use("/users", userRouter)

const eventsRouter = require("./events.routes")
router.use("/events", eventsRouter)

const ticketRouter = require("./ticket.routes")
router.use("/tickets", ticketRouter)

module.exports = router;
