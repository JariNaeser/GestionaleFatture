require("dotenv").config()

//this will allow us to pull params from .env file
const express = require('express')
const app = express()
const bcrypt = require ('bcrypt')
const users = []

app.use(express.json())

//This middleware will allow us to pull req.body.<params>
const port = process.env.TOKEN_SERVER_PORT 

//get the port number from .env file
app.listen(port, () => { 
    console.log(`Authorization Server running on ${port}...`)
})

// REGISTER A USER
app.post("/createUser", async (req,res) => {
    const user = req.body.name
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push ({user: user, password: hashedPassword})
    res.status(201).send(users)
    console.log(users)
})