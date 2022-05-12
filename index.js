const express = require('express')
const mongoose = require('mongoose')
require("dotenv").config()
const app = express()
const UserRoutes = require('./routes/User')
const AuthRoutes = require('./routes/Auth')

const {MONGODB_URI} = require("./config")
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connected Successfully')
  })
  .catch((err) => console.log(err))

app.use(express.json())
app.use('/api/auth', AuthRoutes)
app.use('/api/user', UserRoutes)

const PORT = process.env.PORT || 4000

app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port ::", PORT);
})
