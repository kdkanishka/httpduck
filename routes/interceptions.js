const express = require('express');
const mongoose = require('mongoose');
const envUtils = require('../helpers/envutils');

const router = express.Router();

//import models
require('../models/HttpInterception');
const HttpInterception = mongoose.model('httpinterception');

//receptions index page
router.get('/', (req, res)=> {
    res.render('interceptions/index', {
        
    });
});

//receptions add page
router.get('/add', (req, res)=>{
    //res.render('interceptions/add');
    const newHttpInterception = new HttpInterception({});
    newHttpInterception.save()
    .then(createdHttpInterception => {
        res.render('interceptions/add', {
            url : envUtils.getHostName() + "/interception/" + newHttpInterception._id,
            interceptionId : createdHttpInterception._id
        });
    })
    .catch(err =>{
        console.log(err);
        res.send("Unable to save http interception " + err);
    })
});

//interceptions add router
router.post('/:id', (req, res)=> {
    HttpInterception.findById({
        _id : req.params.id
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