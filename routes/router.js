const express = require("express");
const controllers = require("../controller/controllers");

const router = express.Router();

router.post("/", controllers.getYourResult);
router.post("/post", controllers.postResult);

module.exports = router
