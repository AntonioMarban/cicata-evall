const mysql = require('mysql2');
require('dotenv').config(); 

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});


const connectWithRetry = () => {
  pool.getConnection((err, connection) => {
      if (err) {
          console.error("Error connecting to MySQL, retrying in 5 seconds...");
          setTimeout(connectWithRetry, 5000);
      } else {
          console.log("Conexión con la base de datos establecida");
          connection.release();
      }
  });
};

connectWithRetry();

module.exports = pool;