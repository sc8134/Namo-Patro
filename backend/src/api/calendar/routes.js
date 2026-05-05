const express = require("express");
const router = express.Router();
const { convertAdToBs, convertBsToAd, getPanchang } = require("./controller");

router.get("/convert", convertAdToBs);
router.get("/convert-bs", convertBsToAd);
router.get("/panchang", getPanchang);

module.exports = router;
