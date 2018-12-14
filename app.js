//required packages
const mongoose = require('mongoose');
const express = require('express');

//import models
require('./models/HttpDump')
const HttpDump = mongoose.model('httdump');

//const bodyParser = require('body-parser');
const fs = require('fs');

//constant definitions
const port = process.env.PORT || 8080;

//initialize express
const app = express();

//middleweare
//app.use(bodyParser.raw())

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

app.post("/test", (req, res) => {
    const headers = req.headers
    const headerMap = new Map();
    const properties = new Map();

    properties.set('host', req.host);
    properties.set('IP', req.ip);
    properties.set('protocol', req.protocol)

    for (var key in headers) {
        headerMap.set(key, headers[key]);
    }
    const file = fs.createWriteStream('/home/kanishka/Desktop/node/test');

    let chunks = [];
    let finalBuffer;

    req.on('data', chunk => {
        chunks.push(chunk);
        console.log("temp" + chunks.length)

        file.write(chunk, (error) => {
            if (error != null) {
                console.log(error);
                res.send("IO Error!");
            }
        })
    }).on('end', () => {
        file.end();
        finalBuffer = Buffer.concat(chunks);
        console.log("DONE!" + finalBuffer.length);

        //persist
        const newHttpDump = {
            body : finalBuffer,
            headers : headerMap,
            properties : properties
        };

        new HttpDump(newHttpDump).
        save()
        .then(httpdmp => {
            res.send("Received & Saved!");
        })
        .catch(err => req.send("Error occured " + err));

    });

});

//start express listeners
app.listen(port, () => {
    console.log("HTTPDuck started.")
});
