const express = require("express");
const router = express.Router();
const c = require("./controller");

router.get("/rashifal", c.getRashifal);
router.get("/rashifal/:rashi", c.getRashifalByRashi);
router.get("/compatibility", c.getCompatibility);

module.exports = router;
