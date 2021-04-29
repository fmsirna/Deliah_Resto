const express = require('express');
const cors = require('cors');

require('dotenv').config()

const port = process.env.PORT 
const app = express();
app.use(express.json());
app.listen(port, ()=>console.log("server running"));

app.use(cors()) // to let that outside port information can reach 
app.use(express.static('publica'));// Middleware to expose public and private routes


const userRoutes = require('./routes/users.js')
const orderRoutes = require('./routes/orders.js')


app.use("/users", userRoutes);
app.use("/orders", orderRoutes);



