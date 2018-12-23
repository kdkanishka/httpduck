const express = require('express');
const mongoose = require('mongoose');
const {getHostName} = require('../helpers/hostnameutils');

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
                        httpReceptions : httpReceptions,
                        indexView : true
                    });
                })
                .catch(err =>{
                    res.send("Error occured while retrieving receptions");
                });
        })
        .catch(err => {
            res.send("Error occured while retrieving http dumps");
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
                        receptionUrl: getHostName() + "/reception/" + req.params.id,
                        selectedReceptionId : req.params.id,
                        httpDumps: httpDumps,
                        httpReceptions : httpReceptions
                    });
                })
                .catch(err =>{
                    res.send("Error occured while retrieving receptions");
                });
        })
        .catch(err => {
            res.send("Error occured while retrieving http dumps")
        });
});

//it will create a new httpreception when accessing this route
router.get('/add/new', (req, res) => {
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

//delete route for a selected http dump
router.get('/dump/:id/delete', (req, res)=> {
    HttpDump.deleteOne({_id : req.params.id})
    .then(()=>{
        req.flash('warning_msg', 'HttpDump Removed Successfully!');
        res.redirect('/receptions')
    })
    .catch(err =>{
        console.log(err);
        res.send("Unable to delete")
    })
});

//delete route for receptions
router.get('/:id/delete', (req, res)=> {
    //first find the reception to delete
    HttpDump.deleteMany({
        httpReceptionId : req.params.id
    })
    .then(() => {
        HttpReception.deleteOne({
            _id : req.params.id
        })
        .then(() =>{
            req.flash('warning_msg', 'HttpReception and Associated HttpDumps Removed Successfully!');
            res.redirect('/receptions');
        })
        .catch(err =>{
            res.send("Error when deleting HttpReception")
        });
    })
    .catch(err =>{
        res.send("Error when deleting HttpDump")
    });
});

module.exports = router;