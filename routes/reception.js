const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');

const router = express.Router();

//import models
require('../models/HttpDump')
require('../models/HttpReception')
const HttpDump = mongoose.model('httdump');
const HttpReception = mongoose.model('httpreception')
//routes

router.get("/:id", (req, res) => {
    handleRequest(req, res, "GET");
});

router.post("/:id", (req, res) => {
    handleRequest(req, res, "POST");
});

router.put("/:id", (req, res) => {
    handleRequest(req, res, "PUT");
});

router.delete("/:id", (req, res) => {
    handleRequest(req, res, "DELETE");
});

//end of routes

function handleRequest(req, res, method) {
    HttpReception.findById({
        _id: req.params.id
    })
        .then(httpReception => {
            if (httpReception != null) {
                processRequest(req, res, method, httpReception);
            } else {
                res.send("HTTP Reception is not defined or expired!");
            }
        })
        .catch(err => {
            console.log(err);
            res.send("Error Occured!");
        });
}

function processRequest(req, res, method, httpReception) {
    const headers = req.headers
    const headerMap = [];
    
    for (var key in headers) {
        //headerMap.set(key, headers[key]);
        headerMap.push({
            key : key,
            value : headers[key]
        })
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
            host : req.host,
            ip : req.ip,
            protocol : req.protocol,
            method : method,
            body: finalBuffer,
            headers: headerMap,
            httpReceptionId: httpReception._id
        };

        new HttpDump(newHttpDump).
            save()
            .then(httpdmp => {
                res.send("Received & Saved!");
            })
            .catch(err => req.send("Error occured " + err));

    });
}

module.exports = router;