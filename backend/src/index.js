require('dotenv').config()
require("./db/conn")
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT
app.use(express.json())
app.use(cors())
app.use('/api/user',require('./routes/routing'))
app.get('/', (req, res) => {
    res.send({message:'hi hru'})
  })
app.listen(port,()=>{
    console.log("listening to port"+port)
})