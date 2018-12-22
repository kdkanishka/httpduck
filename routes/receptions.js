const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

//import models
require('../models/HttpReception');
require('../models/HttpDump');
const HttpReception = mongoose.model('httpreception');
const HttpDump = mongoose.model('httdump');

//receptions index page
router.get('/', (req, res) => {
    HttpDump.find({})
        .sort({ date: 'desc' })
        .then(httpDumps => {
            //retrieve http receptions
            HttpReception.find({})
                .sort({date : 'desc'})
                .then(httpReceptions => {
                    res.render('receptions/index', {
                        httpDumps: httpDumps,
                        httpReceptions : httpReceptions
                    });
                })
        })
        .catch(err => {
            res.send("Error occured while retrieving http dumps")
        });
});

//display http dumps for selected reception
router.get('/:id', (req, res)=> {
    HttpDump.find({httpReceptionId : req.params.id})
        .sort({ date: 'desc' })
        .then(httpDumps => {
            //retrieve http receptions
            HttpReception.find({})
                .sort({date : 'desc'})
                .then(httpReceptions => {
                    res.render('receptions/index', {
                        httpDumps: httpDumps,
                        httpReceptions : httpReceptions
                    });
                })
        })
        .catch(err => {
            res.send("Error occured while retrieving http dumps")
        });
});

//it will create a new httpreception when accessing this route
router.get('/add/new', (req, res) => {
    const uuid = "394723492";
    const defaultResponse = "HTTP Duck Says Hello!";

    //create new http reception
    const buffer = new Buffer.from(defaultResponse, "UTF-8");
    const newHttpReception = new HttpReception({
        body: buffer
    });

    newHttpReception.save()
        .then(httpReception => {
            res.render('receptions/add', {
                url: getHostName() + "/reception/" + httpReception._id,
                receptionId: httpReception._id,
                responseBody: defaultResponse
            });
        })
        .catch(err => {
            console.log(err);
        });
});

//update route for httpreception
router.post('/:id', (req, res) => {
    HttpReception.findOne({
        _id: req.params.id
    })
        .then(httpReception => {
            const newHttpReceptionBody = Buffer.from(req.body.responseBody, "UTF-8");
            httpReception.body = newHttpReceptionBody;

            httpReception.save()
                .then(updatedHttpReception => {
                    console.log(updatedHttpReception.body);
                    //TODO success message here
                    res.redirect('/receptions')
                })
                .catch(err => {
                    res.send(err)
                });

        }).catch(err => {
            res.send(err)
        });
});

function getHostName() {
    if (typeof (process.env.APP_BASE_URL) != "undefined") {
        return process.env.APP_BASE_URL;
    } else {
        return "localhost:8080";
    }
}

module.exports = router;