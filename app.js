//required packages
const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

//constant definitions
const port = process.env.PORT || 8080;

//initialize express
const app = express();

//load routes
const receptionRoute = require('./routes/reception');
const receptionsRoute = require('./routes/receptions');
const interceptionsRoute = require('./routes/interceptions');

//db connection
const dbConfig = require('./config/database')
//mongose stuff
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.mongoURI)
    .then(() => console.log("Connected to mongodb"))
    .catch(err => console.log(err));

//middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//end of middleware

//http handlers
app.get("/hello", (req, res) => {
    res.send("Hello!\n")
});

//index route
app.get("/", (req, res)=> {
    const title = "HTTPDuck Http Intercepter"
    res.render('index',{
        title : title
    });
});

//use reception router
app.use('/reception', receptionRoute);
app.use('/receptions', receptionsRoute);
app.use('/interceptions', interceptionsRoute);



//end of http handlers

//start express listeners
app.listen(port, () => {
    console.log("HTTPDuck started.")
});
