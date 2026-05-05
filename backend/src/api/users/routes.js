const express = require("express");
const router = express.Router();
const { register, login, getProfile } = require("./controller");
const authMiddleware = require("../../services/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware, getProfile);

module.exports = router;
