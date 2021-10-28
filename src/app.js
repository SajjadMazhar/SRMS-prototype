const express = require("express");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const Router = require("../routes/router")
const {getResult} = require("../controller/controllers");

require("./db/conn");

dotenv.config();

const port = process.env.PORT || 4000;


// middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded());
app.use("/result", Router);

app.set("view engine", "hbs");

app.get("/result/:roll", getResult);

app.listen(port, ()=>{
    console.log("all good!")
})
