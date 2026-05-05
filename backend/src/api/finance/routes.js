const express = require("express");
const router = express.Router();
const c = require("./controller");

router.get("/forex", c.getForex);
router.get("/metals", c.getMetals);
router.get("/vegetables", c.getVegetables);
router.get("/shares", c.getShares);

module.exports = router;
