const express = require("express");
const { createCommunity } = require("../controller/communityComtroller");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

router.post("/",protect, createCommunity);

module.exports = router;