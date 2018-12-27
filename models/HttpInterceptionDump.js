const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema for http interception dump
const HttpInterceptionDump = new Schema({
    httpInterceptionId : {
        type : String,
        required : true
    },
    originalRequestDumpId : {
        type : String,
        required : false
    },
    forwardedRequestDumpId : {
        type : String,
        required : false
    },
    date : {
        type : Date,
        default : Date.now
    }
});

mongoose.model('httpinterceptiondump', HttpInterceptionDump);