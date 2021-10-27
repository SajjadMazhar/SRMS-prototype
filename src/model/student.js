
const mongoose = require("mongoose");

const resultSchema = mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    roll:{
        type:String,
        required:true,
        unique:true
    },
    dob:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    result:{
        type:Object,
        required:true
    }
});

const Result = new mongoose.model("Result", resultSchema);

module.exports = Result