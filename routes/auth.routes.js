const router = require("express").Router();

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {verifyToken, verifyAdmin} = require("../middleware/auth.middlewares")

const User = require("../models/User.model")


//rutas de Auth
//POST "/api/auth/login"
router.post("/signup", async (req,res, next) => {

    //validaciones de servidor
    const { email, username, password } = req.body

    if(!email || !username || !password) {
        res.status(400).json({ errorMessage: "Todos los campos son obligatorios"})
        return
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,}$/gm
    if(passwordRegex.test(password) === false) {
        res.status(400).json({ errorMessage: "La contraseña requiere al menos 8 caracteres, una mayúscula y un número."})
        return
    }

    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
    if(emailRegex.test(email) === false) {
        res.status(400).json({ errorMessage: "Revisa que el email esté correcto."})
        return
    }

try {

    const foundUser = await User.findOne({ email: email })
    console.log(foundUser)
    if (foundUser !== null){
        res.status(400).json({ errorMessage: "Ya existe un usuario con ese email."})
        return
    }

    const hashPassword = await bcrypt.hash(password, 12) // 12 es la sal
        
        await User.create({
            email: email,
            username: username,
            password: hashPassword
        })
        
        res.sendStatus(201)

} catch (error) {
    next(error)
    
}

})


//POST "/api/auth/login"
router.post("/login", async (req, res, next) => {

    const {email, password } = req.body

    if(!email || !password) {
        res.status(400).json({errorMessage: "Todos los campos son obligatorios."})
        return
    }

    try {

        const foundUser = await User.findOne({email: email})
        if(foundUser === null) {
            res.status(400).json({errorMessage: "Usuario no encontrado con ese email"})
            return
        }

        const isPasswordCorrect = await bcrypt.compare(password, foundUser.password) 
        if(isPasswordCorrect === false) {
            res.status(400).json({errorMessage: "Contraseña incorrecta."})
            return
        }

        // payload es la información unica del usuario que lo identifica que estara dentro del token.
        const payload = {
            _id: foundUser._id,
            email: foundUser.email,
            role: foundUser.role
        }

        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, { algorithm: "HS256", expiresIn: "7d" })

        res.status(200).json({authToken: authToken})
        
    } catch (error) {
        next(error)
        
    }

})


//GET "/api/auth/verify"
router.get("/verify", verifyToken, (req, res) => {

    console.log(req.payload)

    res.status(200).json({payload: req.payload})

})

router.delete("/private-page-example", verifyToken, verifyAdmin, (req, res) => {

    console.log(req.payload._id)
    res.status(201).json("borrado")
})


module.exports = router