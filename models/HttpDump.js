const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema for http dump
const HttpDumpSchema = new Schema({
    method : {
        type : String,
        required : true
    },
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
    },
    httpReceptionId : {
        type : String,
        required : true
    }
});

mongoose.model('httdump', HttpDumpSchema);