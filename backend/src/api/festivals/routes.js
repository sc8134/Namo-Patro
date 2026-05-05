const express = require("express");
const router = express.Router();
const { getAllFestivals, getFestivalsByMonth, getAllLiveFestivals, getEventsByBsMonth } = require("./controller");

router.get("/",                  getAllFestivals);
router.get("/all",               getAllLiveFestivals);       // live from GitHub
router.get("/month/:month",      getFestivalsByMonth);
router.get("/bs/:year/:month",   getEventsByBsMonth);        // by BS year+month

module.exports = router;
