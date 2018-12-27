const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema for http reception
const HttpInterceptionSchema = new Schema({
    forwardUrl : {
        type : String
    },
    name : {
        type : String,
    },
    date : {
        type : Date,
        default : Date.now
    }
});

mongoose.model('httpinterception', HttpInterceptionSchema);