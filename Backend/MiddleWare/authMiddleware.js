const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) { // Fixed startsWith typo
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authentication invalid" });
  }
  
  const token = authHeader.split(" ")[1];
  
  try {
    const { username, userid } = jwt.verify(token, "secret"); // Make sure "secret" matches your token generation secret
    req.user = { username, userid };
    next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authentication invalid" });
  }
}

module.exports = { authenticateToken: authMiddleware }; // Updated export
