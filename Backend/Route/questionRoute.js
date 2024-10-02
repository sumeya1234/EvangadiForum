// Import express and route module
const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../MiddleWare/authMiddleware");

// Import question controllers
const {
  submitQuestion,
  getAllQuestions,
  getSingleQuestion,
} = require("../Controller/questionController");

// Log imported functions for debugging
console.log({ submitQuestion, getAllQuestions, getSingleQuestion });

// Get All Questions
router.get("/questions", getAllQuestions);

// Get Single Question
router.get("/question/:question_id", getSingleQuestion);

// Post Question
router.post("/question", authenticateToken, submitQuestion);

// Export the router
module.exports = router;
