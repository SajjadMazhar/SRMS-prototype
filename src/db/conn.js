const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/srms", {useUnifiedTopology:true , useCreateIndex: true, useNewUrlParser:true}).then(()=>{
    console.log("database connected..");
}).catch((err)=>{
    console.log("Error occur: ", err);
})