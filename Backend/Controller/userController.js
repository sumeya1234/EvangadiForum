const dbConnection = require("../Database/dbConfig");
const {StatusCodes} = require("http-status-codes");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//--------------------------------------- Register Function------------------------------------------
async function register(req,res){
    const { username, firstname, lastname, email, password } = req.body;
    if ( !username || !firstname || !lastname || !email || !password ){
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({msg : "Please provide all required fields"})
    }
    try {
        const [user] = await dbConnection.query("SELECT username, userid FROM users WHERE username = ? or email = ?" , [username, email])
        // console.log(user[0].userid); 
        // console.log({user : });
        if (user.length > 0) {
            return res.status(StatusCodes.CONFLICT)
            .json({ msg : "You have already registered"});
        }
        if (password.length <= 8){
            return res.status(StatusCodes.BAD_REQUEST)
            .json({ msg : "Password must be greater than 8 characters"});
        }
        // Password encryption
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        await dbConnection.query(
            "INSERT INTO users (username,firstname, lastname, email, password) VALUES (?,?,?,?,?)",
            [username,firstname,lastname,email,hashedPassword]
        );
        return res.status(StatusCodes.CREATED).json({msg : "User created successfully"});
    } catch (error) {
        console.log(error.message)
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: "Something went wrong,Try again later" });
    }
    // res.send("Register user")
}
//--------------------------------------- Log in Function------------------------------------------
async function login(req,res){
    const { email, password } = req.body;
    if (!email || !password) {
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Please provide all required fields" });
    }
    try {
        const [user] = await dbConnection.query("SELECT username, userid, password FROM users WHERE email = ?" , [email])
        if (user.length == 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({ msg : "User not found"})
        }
        // Comparing password
        const isMatch= await bcrypt.compare(password, user[0].password);
        if (!isMatch) {
            return res.status(StatusCodes.BAD_REQUEST).json({ msg : "Invalid Password" });
        }
        
        // Generating token
        const username = user[0].username;
        const userid = user[0].userid;
        const token = jwt.sign({ username , userid },process.env.JWT_SECRET, { expiresIn: "30d" });
            return res.status(StatusCodes.OK).json({ msg : "Logged in successfully", token : token ,username: username});
    } catch (error) {
        console.log(error.message);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: "Something went wrong, Try again later" });
    }
}
//---------------------------------------Check user Function------------------------------------------
async function checkUser(req,res){
    const username = req.user.username;
    const userid = req.user.userid;
    res.status(StatusCodes.OK).json({ msg : "Valid User", username, userid})
}
module.exports = {register, login, checkUser}