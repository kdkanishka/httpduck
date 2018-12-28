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
                        httpInterceptionDumps: httpInterceptionDumps,
                        httpInterceptions: httpInterceptions,
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
router.get('/:id', (req, res) => {
    HttpInterceptionDump.find({ httpInterceptionId: req.params.id })
        .sort({ date: 'desc' })
        .then(httpInterceptionDumps => {
            HttpInterception.find({})
                .sort({ date: 'desc' })
                .then(httpInterceptions => {
                    HttpInterception.findById({
                        _id: req.params.id
                    })
                        .then(selectedInterception => {
                            res.render('interceptions/index', {
                                interceptionUrl: envUtils.getHostName() + "/interception/" + req.params.id,
                                selectedInterception : selectedInterception,
                                httpInterceptionDumps: httpInterceptionDumps,
                                httpInterceptions: httpInterceptions
                            });
                        })
                        .catch(err => {

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

//delete route for a selected http interception dump
router.get('/dump/:id/delete', (req, res) => {
    HttpInterceptionDump.deleteOne({ _id: req.params.id })
        .then(() => {
            req.flash('warning_msg', 'Http Interception Dump Removed Successfully!');
            res.redirect('/interceptions')
        })
        .catch(err => {
            console.log(err);
            res.send("Unable to delete")
        })
});

//delete route for receptions
router.get('/:id/delete', (req, res) => {
    //first find the reception to delete
    HttpInterceptionDump.deleteMany({
        httpInterceptionId: req.params.id
    })
        .then(() => {
            HttpInterception.deleteOne({
                _id: req.params.id
            })
                .then(() => {
                    req.flash('warning_msg', 'HttpInterception and Associated Interceptiondumps Removed Successfully!');
                    res.redirect('/interceptions');
                })
                .catch(err => {
                    res.send("Error when deleting HttpReception")
                });
        })
        .catch(err => {
            res.send("Error when deleting HttpDump")
        });
});

module.exports = router;