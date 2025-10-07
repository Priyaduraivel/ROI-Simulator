const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",          // your MySQL username
  password: "Priya@123",  // your MySQL password
  database: "invoicing_roi_simulator"
});

connection.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database!");
  }
});

module.exports = connection;
