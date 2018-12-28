const express = require('express');
const mongoose = require('mongoose');
const envUtils = require('../helpers/envutils');

const router = express.Router();

//import models
require('../models/HttpInterception');
require('../models/HttpInterceptionDump');

const HttpInterception = mongoose.model('httpinterception');
const HttpInterceptionDump = mongoose.model('httpinterceptiondump');

//receptions index page
router.get('/', (req, res) => {
    HttpInterceptionDump.find({})
        .sort({ date: 'desc' })
        .then(httpInterceptionDumps => {
            HttpInterception.find({})
                .sort({ date: 'desc' })
                .then(httpInterceptions => {
                    res.render('interceptions/index', {
                        httpInterceptionDumps : httpInterceptionDumps,
                        httpInterceptions : httpInterceptions,
                        indexView: true
                    });
                })
                .catch(err => {
                    res.send("Error occured while retrieving http interceptions");
                });
        })
        .catch(err => {
            res.send("Error occured while retrieving http interception dumps");
        });
});

//display only selected http reception
router.get('/:id', (req, res)=> {
    HttpInterceptionDump.find({httpInterceptionId : req.params.id})
        .sort({ date: 'desc' })
        .then(httpInterceptionDumps => {
            HttpInterception.find({})
                .sort({ date: 'desc' })
                .then(httpInterceptions => {
                    res.render('interceptions/index', {
                        interceptionUrl: envUtils.getHostName() + "/interception/" + req.params.id,
                        selectedInterceptionId: req.params.id,
                        httpInterceptionDumps : httpInterceptionDumps,
                        httpInterceptions : httpInterceptions
                    });
                })
                .catch(err => {
                    res.send("Error occured while retrieving http interceptions");
                });
        })
        .catch(err => {
            res.send("Error occured while retrieving http interception dumps");
        });
});

//receptions add page
router.get('/add/new', (req, res) => {
    //res.render('interceptions/add');
    const newHttpInterception = new HttpInterception({});
    newHttpInterception.save()
        .then(createdHttpInterception => {
            res.render('interceptions/add', {
                url: envUtils.getHostName() + "/interception/" + newHttpInterception._id,
                interceptionId: createdHttpInterception._id
            });
        })
        .catch(err => {
            console.log(err);
            res.send("Unable to save http interception " + err);
        })
});

//interceptions add router
router.post('/:id', (req, res) => {
    HttpInterception.findById({
        _id: req.params.id
    })
        .then(interception => {
            //set necessary parameters for interception
            interception.forwardUrl = req.body.forwardUrl,
                interception.name = req.body.name;

            interception.save()
                .then(updatedInterception => {
                    res.redirect('/interceptions');
                })
                .catch(err => {
                    console.log(err);
                    res.send("Unable to update http interception : " + err);
                });
        })
        .catch(err => {
            console.log(err);
            res.send("Error!" + err);
        })
})

module.exports = router;