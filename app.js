require("dotenv").config()
const fs = ("fs")
const path = require("path")
const express = require("express")
const { Registr, Home, Log} = require("./src/controller/controller.js")
const { log } = require("console")

const app = express()
app.use(  express.json()  )

app.get("/", Home)
app.post("/register", Registr )
app.post("/log", Log )


const PORT = process.env.PORT
app.listen(PORT, () => console.log(PORT)) 