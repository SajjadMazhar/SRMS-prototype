const express = require("express");
const controllers = require("../controller/controllers");

const router = express.Router();
router.get("/", controllers.testResult)
router.get("/:roll", controllers.getResult);

module.exports = router