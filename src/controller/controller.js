const path = require("path")
const fs = require('fs')
const Module = require("../module/module")
const Io = require("../utils/io")
const Database = new Io(path.join( process.cwd(), "database", "data.json"))

const Home = (req, res) => {

    res.status(200).json({message: "hiii"}) 
}

const Registr = async (req, res) => {

    const {name, password, email} = req.body

    const read = await Database.read()    
    const foundName = read.find((user) => user.name == name ) 
    if(!foundName) {
        const id = (read[read.length - 1]?.id || 0) + 1
    const newdata = new Module(id, name, password, email)
    const data = read.length ? [...read, newdata] : [newdata]

    await Database.write(data)

    res.status(200).json({message: "succesfully writen"})
    } else {
        res.status(400).json({message: "this username already token"})
    }
    
}

const Log = async (req, res) => {
    const {name, password} = req.body
    const read = await Database.read()
    const foundName = read.find((user) => user.name == name ) 
    const foundPasswor = read.find((user) => user.password == password ) 
    if(foundName && foundPasswor) {
        res.status(201).json({message: "Ahlan va sahlan"})
    } else{
        res.status(201).json({message: "login or password is wrong "})
    }
}
module.exports = {
    Home,
    Registr,
    Log
}