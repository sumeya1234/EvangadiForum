const express = require("express");
const app = express();
const port = 5500;
const dbConnection = require("./Database/dbConfig");  // DB connection


// User routes middleware file
const userRoutes = require("./Route/userRoute");
const questionRoutes = require("./Route/questionRoute");
const answerRoutes = require("./Route/answerRoute");
// JSON middleware to extract json data
app.use(express.json());

// User route middleware
app.use("/api/users", userRoutes);

// Questions route middleware
app.use("/api/question", questionRoutes)

// Answers route middleware
app.use("/api/answer", answerRoutes);

async function start(){
    try {
        const result = dbConnection.execute("select 'test' ");
        await app.listen(port)
        console.log("Database connection established")
        console.log(`listening on ${port}`)
    } catch (error) {
        console.log(err)
    }
}
start()