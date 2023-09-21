const express = require("express");
const { signUp, signIn, me } = require("../controller/authController");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/me",protect, me);

module.exports = router;