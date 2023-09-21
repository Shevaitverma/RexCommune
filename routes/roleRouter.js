const express = require("express");
const { createRole, getAll } = require("../controller/roleController");
const router = express.Router();
const protect = require("../middleware/authMiddleware");


router.post("/",protect, createRole);
router.get("/", getAll);

module.exports = router;