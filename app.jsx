const express = require("express");
const app = express();
const port = 5500;

//This is a comment added by Mesgana
//Additional code per NAti's request

// Database connection
const dbConnection = require("./db/dbConfig.jsx");

// User routes middleware
const userRoutes = require("./routes/userRoute.jsx"); // Include .jsx here

// Middleware to parse JSON
app.use(express.json()); // Add this line

//user routes middleware
app.use("/api/users", userRoutes);
console.log("User routes registered at /api/users");

// Questions routes middleware
const questionRoutes = require("./routes/questionRoute.jsx");
app.use("/api/questions", questionRoutes);
console.log("Question routes registered at /api/questions");

// Answers routes middleware
const answerRoutes = require("./routes/answerRoute.jsx");
app.use("/api/answers", answerRoutes);
console.log("Answer routes registered at /api/answers");

async function start() {
  try {
    const result = await dbConnection.execute("SELECT 'test'");
    await app.listen(port);
    console.log("Database connection established");
    console.log(`Listening on ${port}`);
  } catch (error) {
    console.log(error.message);
  }
}

start();
