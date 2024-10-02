const dbConnection = require("../Database/dbConfig.js");
const { 
  OK, 
  CREATED, 
  NOT_FOUND, 
  BAD_REQUEST, 
  INTERNAL_SERVER_ERROR 
} = require("http-status-codes");

async function getAllQuestions(req, res) {
  try {
    const [questions] = await dbConnection.query("SELECT * FROM questions");
    return res.status(OK).json(questions);
  } catch (error) {
    console.error("Error retrieving questions:", error.message);
    console.error(error.stack);
    return res
      .status(NOT_FOUND)
      .json({ msg: "The questions you are looking for are not found" });
  }
}

async function getSingleQuestion(req, res) {
  const { question_id } = req.params; // Updated parameter name

  try {
    const [question] = await dbConnection.query(
      "SELECT * FROM questions WHERE question_id = ?", // Updated SQL query
      [question_id]
    );
    if (question.length === 0) {
      return res.status(NOT_FOUND).json({ msg: "Question not found" });
    }
    return res.status(OK).json(question[0]);
  } catch (error) {
    console.error("Error retrieving question:", error.message);
    console.error(error.stack);
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later!" });
  }
}

async function submitQuestion(req, res) {
  const { title, description, tag } = req.body;
  const { id: user_id } = req.user; // Assuming req.user is set by the middleware

  // Validate required fields
  if (!title || !description) {
    return res
      .status(BAD_REQUEST)
      .json({ msg: "Please provide title and description" });
  }

  try {
    // Insert question into database
    await dbConnection.query(
      "INSERT INTO questions (user_id, title, description, tag) VALUES (?, ?, ?, ?)",
      [user_id, title, description, tag]
    );

    // Return success response
    return res.status(CREATED).json({ msg: "Question created successfully!" });
  } catch (error) {
    // Log error details
    console.error("Error creating question:", error.message);
    console.error(error.stack);

    // Return internal server error response
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later!" });
  }
}

module.exports = { getAllQuestions, getSingleQuestion, submitQuestion };

