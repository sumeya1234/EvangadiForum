const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        console.log("Authorization header missing or invalid format.");
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Authentication invalid" });
    }

    const token = authHeader.split(" ")[1];
    try {
        const { username, userid } = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { username, userid };
        next();
    } catch (error) {
        console.log("Token verification failed:", error);
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Authentication invalid" });
    }
}

module.exports = authMiddleware;
