const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema for http dump
const HttpDumpSchema = new Schema({
    host: {
        type: String,
        required : true
    },
    ip: {
        type: String
    },
    protocol: {
        type: String
    },
    method: {
        type: String,
        required: true
    },
    body: {
        type: Buffer,
        required: false
    },
    responseBody: {
        type: Buffer,
        required: false
    },
    headers: {
        type: [{ key: String, value: String }],
        required: false
    },
    responseHeaders: {
        type: [{ key: String, value: String }],
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    responseStatus : {
        type : Number
    },
    reasonPhrase : {
        type : String,
        default : ""
    },
    httpReceptionId: {
        type: String,
        required: false
    }
});

mongoose.model('httdump', HttpDumpSchema);