const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const userRoutes = require("./routes/userRoutes")

const app = express()

// Configuración de CORS más permisiva para desarrollo
app.use(cors())

// Middleware
app.use(bodyParser.json())

// Rutas
app.use("/api", userRoutes)

module.exports = app

