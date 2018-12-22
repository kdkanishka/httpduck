const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema for http dump
const HttpDumpSchema = new Schema({
    host : {
        type : String
    },
    ip : {
        type : String
    },
    protocol : {
        type : String
    },
    method : {
        type : String,
        required : true
    },
    body : {
        type : Buffer,
        required : false
    },
    headers : {
        type : [{key : String, value : String}],
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