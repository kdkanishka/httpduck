const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

//import models
require('../models/HttpInterception');
require('../models/HttpInterceptionDump');
require('../models/HttpDump');

const HttpDump = mongoose.model('httdump');
const HttpInterceptionDump = mongoose.model('httpinterceptiondump');

router.get('/:id', (req, res) => {
    HttpInterceptionDump.findById(req.params.id)
        .then(httpImterceptionDump => {
            //Find associated http dumps with this http interception
            HttpDump.find({
                '_id': {
                    $in: [
                        mongoose.Types.ObjectId(httpImterceptionDump.originalRequestDumpId),
                        mongoose.Types.ObjectId(httpImterceptionDump.forwardedRequestDumpId)
                    ]
                }
            }, function(err, docs){
                if(err){
                    console.log(err)
                    res.send("Unable to load http inspection dumps " + err)
                }else{
                    //render view
                    res.render('httpinterceptionsdumps/inspect', {
                        httpImterceptionDump : httpImterceptionDump,
                        originalRequestDump : docs[0],
                        forwardedRequestDump : docs[1]
                    });
                }
            });
        })
        .catch(err => {
            console.log(err)
            res.send("Unable to retrieve http interception dump" + err)
        })
});

module.exports = router;