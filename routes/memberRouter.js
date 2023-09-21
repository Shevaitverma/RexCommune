const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { addMember, removeMember } = require("../controller/memberController");

router.post("/",protect, addMember);
router.delete("/:id", protect, removeMember)

module.exports = router;