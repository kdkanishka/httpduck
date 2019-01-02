//required packages
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const envUtils = require('./helpers/envutils');


//constant definitions
const port = envUtils.getServerPort();
const host = envUtils.getServerHost();

//initialize express
const app = express();

//load routes
const receptionRoute = require('./routes/reception');
const receptionsRoute = require('./routes/receptions');
const interceptionsRoute = require('./routes/interceptions');
const interceptionRoute = require('./routes/interception');
const interceptionDumpsRoute = require('./routes/interceptiondumps');

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

// Handlebars.helpers.registerHelper( 'eachInMap', function ( map, block ) {
//     var out = '';
//     Object.keys( map ).map(function( prop ) {
//        out += block.fn( {key: prop, value: map[ prop ]} );
//     });
//     return out;
//  } );

//body-parser middleweare
// app.use(multer({dest:'/home/kanishka/Desktop/node/'}).single('file'));
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());

//static resource directory
app.use(express.static(path.join(__dirname, 'public')));

//express middleware for session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

//middleware for flash  
app.use(flash());

//global variables
app.use(function(req,res,next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.warning_msg = req.flash('warning_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null ;
    next();
});

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

app.get("/about", (req, res)=> {
    res.render('about',{

    });
})

//use reception router
app.use('/reception', receptionRoute);
app.use('/receptions',bodyParser.urlencoded({ extended: true }), receptionsRoute);
app.use('/interceptions', bodyParser.urlencoded({ extended: true }), interceptionsRoute);
app.use('/interception', interceptionRoute);
app.use('/interceptiondumps', interceptionDumpsRoute);

//end of http handlers

//start express listeners
app.listen(port,host, () => {
    console.log("HTTPDuck started.")
});
