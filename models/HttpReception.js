const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//schema for http reception
const HttpReceptionSchema = new Schema ({
    body : {
        type : Buffer,
        required : false
    },
    date : {
        type : Date,
        default : Date.now
    }
});

mongoose.model('httpreception', HttpReceptionSchema);