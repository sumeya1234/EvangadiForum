const express = require("express");
const router = express.Router();

// Authentication middleware
const authMiddleware = require("../MiddleWare/authMiddleware");
// User controllers
const { register, login, checkUser } = require("../Controller/userController");

// Login route
router.post("/login", login);
// Register route
router.post("/register", register);
// Check user route
router.get("/check", authMiddleware, checkUser);

module.exports = router;