const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

//import models
require('../models/HttpReception');
const HttpReception = mongoose.model('httpreception');

//receptions index page
router.get('/', (req, res)=> {
    res.render('receptions/index', {
    });
});

//it will create a new httpreception when accessing this route
router.get('/add', (req, res) => {
    const uuid = "394723492";
    const defaultResponse = "HTTP Duck Says Hello!";

    //create new http reception
    const buffer = new Buffer.from(defaultResponse,"UTF-8");
    const newHttpReception = new HttpReception({
        body : buffer
    });

    newHttpReception.save()
    .then(httpReception => {
        res.render('receptions/add', {
            url : getHostName()+ "/reception/" + httpReception._id,
            receptionId : httpReception._id,
            responseBody : defaultResponse
        });
    })
    .catch(err=> {
        console.log(err);
    });
});

//update route for httpreception
router.post('/:id', (req,res)=> {
    HttpReception.findOne({
        _id : req.params.id
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


function getHostName(){
    if(typeof(process.env.APP_BASE_URL) != "undefined"){
        return process.env.APP_BASE_URL;
    }else{
        return "localhost:8080";
    }
}

module.exports = router;