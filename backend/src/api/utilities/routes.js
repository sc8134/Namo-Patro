const express = require("express");
const router = express.Router();
const c = require("./controller");
router.get("/dictionary", c.searchDictionary);
router.get("/news-portals", c.getNewsPortals);
module.exports = router;
