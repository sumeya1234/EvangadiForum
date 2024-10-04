const express = require("express");
const router = express.Router();

// Authentication middleware
const authMiddleware = require("../Middleware/authMiddleware");

// Question controllers
const {
    getAllQuestions,
    getSingleQuestion,
    postQuestion,
} = require("../Controller/questionController");

// Route to get all questions
router.get("/", authMiddleware, getAllQuestions);
// Route to get single question
router.get("/:question_id", authMiddleware, getSingleQuestion);
// Route to post question
router.post("/", authMiddleware, postQuestion);

module.exports = router;