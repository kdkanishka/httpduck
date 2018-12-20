//required packages
const express = require('express');
const mongoose = require('mongoose');

//constant definitions
const port = process.env.PORT || 8080;

//initialize express
const app = express();

//load routes
const receptionRoute = require('./routes/reception');

//db connection
const dbConfig = require('./config/database')
//mongose stuff
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.mongoURI)
    .then(() => console.log("Connected to mongodb"))
    .catch(err => console.log(err));

//http handlers
app.get("/hello", (req, res) => {
    res.send("Hello!\n")
});

//use reception router
app.use('/reception', receptionRoute);

//start express listeners
app.listen(port, () => {
    console.log("HTTPDuck started.")
});
