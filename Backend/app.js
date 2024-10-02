// Import required modules
const express = require("express");
const mysql2 = require("mysql2");
const dbConnection = require("./Database/dbConfig.js");

// Create Express app instance
const app = express();
const PORT = 5500;

// Middleware to parse JSON requests
app.use(express.json());

// Route middleware files
const userRoutes = require("./Route/useRoute.js");
const answerRoutes = require("./Route/answerRoute.js");
const questionRoutes = require("./Route/questionRoute.js");

// Mount route middlewares
app.use("/api/users", userRoutes);
app.use("/api/answer", answerRoutes);
app.use("/api", questionRoutes);

// Start server and establish database connection
async function start() {
  try {
    // Test database connection
    const result = await dbConnection.execute("SELECT 'test'");
    console.log("Database connection established");

    // Start server
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (error) {
    console.error(error.message);
  }
}

start();