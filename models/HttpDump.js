const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema for http dump
const HttpDumpSchema = new Schema({
    body : {
        type : Buffer,
        required : false
    },
    headers : {
        type : Map,
        required : false
    },
    properties : {
        type : Map,
        required : false
    },
    date : {
        type : Date,
        default : Date.now
    }
});

mongoose.model('httdump', HttpDumpSchema);