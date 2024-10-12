const express = require("express");
const router = express.Router();

// Authentication middleware
const authMiddleware = require("../MiddleWare/authMiddleware");

// Answer controllers
const {getAnswer, postAnswer} = require("../Controller/answerController");

// Route to post an answer
router.post("/",authMiddleware, postAnswer);
// Route to get an answer
router.get("/:question_id",authMiddleware, getAnswer);

module.exports = router;