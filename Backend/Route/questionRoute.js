const express = require("express");
const router = express.Router();

// Authentication middleware
const authMiddleware = require("../MiddleWare/authMiddleware");

// Question controllers
const {
    getAllQuestions,
    getSingleQuestion,
    postQuestion,
} = require("../Controller/questionController");

// Route to get all questions
router.get("/", getAllQuestions);
// Route to get single question
router.get("/:question_id", getSingleQuestion);
// Route to post question
router.post("/", authMiddleware, postQuestion);

module.exports = router;