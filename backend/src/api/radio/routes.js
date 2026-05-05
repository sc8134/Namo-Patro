const express = require("express");
const router = express.Router();
const c = require("./controller");
router.get("/stations", c.getStations);
router.get("/bhajans", c.getBhajans);
module.exports = router;
