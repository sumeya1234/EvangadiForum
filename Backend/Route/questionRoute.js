const express = require("express");
const router = express.Router();

// Authentication middlewares
const authMiddleware = require("../MiddleWare/authMiddleware.js"); 

// Question controllers
const {
    getAllQuestions,
    getSingleQuestion,
    postQuestion,
} = require("../Controller/questionController");


// Route to post question
router.post("/", authMiddleware, postQuestion);
// Route to get all questions
router.get("/", authMiddleware, getAllQuestions);
// Route to get single question
router.get("/:question_id", authMiddleware, getSingleQuestion);


module.exports = router;