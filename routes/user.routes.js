const router = require("express").Router();
const {verifyToken, verifyAdmin} = require("../middleware/auth.middlewares")
const User = require("../models/User.model")
const express = require("express")


//todos los usuarios (funciona)

router.get("/", async (req, res, next) => {

    try {

        const response = await User.find()
        res.status(200).json(response) 
        
    } catch (error) {
        next(error)
    }

})

//editar usuario
router.patch("/:id",verifyToken, async ( req, res, next) => {
    try {
        
    console.log(req.body.username)
        const response = await User.findByIdAndUpdate(req.payload._id, 
            {
                username: req.body.username
            },{new: true}
        )
        res.status(200).json(response)

    } catch (error) {
        next(error)
    }
})


module.exports = router