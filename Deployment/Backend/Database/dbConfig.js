const mysql2 = require('mysql2/promise'); // Use promise-based version

// Database connection
const dbConnection = mysql2.createPool({
  user: process.env.USER,
  database:process.env.DATABASE ,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  connectionLimit: 10
});
console.log(process.env.JWT_SECRET)




module.exports = dbConnection; // Ensure you export the connection pool
