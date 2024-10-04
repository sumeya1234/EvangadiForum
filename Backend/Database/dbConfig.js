const mysql2 = require('mysql2/promise'); // Use promise-based version

// Database connection
const dbConnection = mysql2.createPool({
  user: "evangadi-admin",
  database: "evangadi-forum",
  host: "localhost",
  password: "123456",
  connectionLimit: 10
});

// Test the connection
// async function testConnection() {
//   try {
//     const [result] = await dbConnection.query("SELECT 'test'");
//     console.log(result);
//   } catch (err) {
//     console.log(err.message);
//   }
// }

// testConnection();

module.exports = dbConnection; // Ensure you export the connection pool
