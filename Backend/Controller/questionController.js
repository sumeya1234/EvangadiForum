const dbConnection = require("../Database/dbConfig");
const { StatusCodes } = require("http-status-codes");
const { v4 : uuidv4} = require("uuid");  // Universally unique identifier
async function getAllQuestions(req,res){
    try{
        const [questions] = await dbConnection.query("SELECT * FROM questions, users WHERE questions.userid = users.userid");
        if(questions.length == 0){
            return res.status(StatusCodes.NOT_FOUND).json({ msg : "No questions found"})
        }
        return res.status(StatusCodes.OK).json({ msg : "All questions appeared", questions });       
    }
    catch (error) {
    console.log(error.message)
    return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: "Something went wrong,Try again later" });
    }
}
async function getSingleQuestion(req, res) {
    const { question_id } = req.params;
    try{
        // const [singleQuestion] = await dbConnection.query("SELECT * FROM questions WHERE questionid =?", [question_id]); 
        const [singleQuestion] = await dbConnection.query("SELECT * FROM questions, users WHERE questions.userid = users.userid AND questionid =?", [question_id]); 
        // console.log(singleQuestion)
        //const [singleQuestion] = await dbConnection.query("SELECT * FROM questions WHERE id =?", [question_id]);
        if(singleQuestion.length == 0){
            return res.status(StatusCodes.NOT_FOUND).json({ msg : "The requested question could not be found."})
        }
        return res.status(StatusCodes.OK).json({ msg : "Here is the question", singleQuestion})
    }
    catch(error){
        console.log(error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong,Try again later" });
    }
}
async function postQuestion(req, res){
    const { title , tag,description } = req.body;
    if(!title || !description){
        return res.status(StatusCodes.BAD_REQUEST).json({ msg : "Please provide all required fields"});
    }
    try{
        const questionid = uuidv4();
        const userid = req.user.userid;
        await dbConnection.query(
            "INSERT INTO questions (userid, questionid, title, tag, description) VALUES (?,?,?,?,?)",
            [userid, questionid, title,tag, description] 
        );
        return res.status(StatusCodes.CREATED).json({ msg : "Your question is posted"});
        // console.log(error.message)
    }
    catch(error){
        console.log(error.message)
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: "Something went wrong,Try again later" });
    }
}

module.exports = { getAllQuestions, getSingleQuestion, postQuestion}