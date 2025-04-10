const router = require("express").Router();
const {verifyToken, verifyAdmin} = require("../middleware/auth.middlewares")
const User = require("../models/User.model")
const express = require("express")


//todos los usuarios (funciona)

router.get("/:userId", verifyToken, async (req, res, next) => {

    try {
        const { userId } = req.params

        if (req.payload._id !== userId) {
            return res.status(403).json({message: "Acceso denegado."})
        }

        const user = await User.findById(userId).populate("ticketsPurchased")

        if(!user) {
            return res.status(404).json({message: "Usuario no encontrado"})
        }
        res.status(200).json({
            username: user.username,
            role: user.role,
            ticketPurchased: user.ticketsPurchased
        })
        
    } catch (error) {
        next(error)
    }

})
// obtener usuarios Admin
router.get("/", verifyToken, verifyAdmin, async (req, res, next) => {

    try {

        const response = await User.find()
        res.status(200).json(response) 
        
    } catch (error) {
        next(error)
    }

})

//editar usuario
router.patch("/:userId",verifyToken, async ( req, res, next) => {
    try {

        if(req.payload._id !== req.params.userId){
            return res.status(403).json({message: "Acceso denegado"})
        }
        
    console.log(req.body.username)
        const response = await User.findByIdAndUpdate(req.params.userId, 
            {
                username: req.body.username
            },{new: true}
        )
        res.status(200).json(response)

    } catch (error) {
        next(error)
    }
})

router.delete("/:id", verifyToken, verifyAdmin, async (req, res, next) => {
    try {
        const userId = req.params.id
        const deleteUser = await User.findByIdAndDelete(userId)

        if(!deleteUser) {
            return res.status(404).json({error: "Usuario no encontrado"})
        }
        res.status(200).json({ message: "Usuario borraco", deleteUser})

    } catch (error) {
        next(error)
        
    }
})


module.exports = router