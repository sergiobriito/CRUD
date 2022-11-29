const mysql = require("mysql2");

const connectDB = () => {
  try {
    const conn = mysql.createPool({
      host: process.env.HOST_DB,
      user: process.env.USER_DB,
      password: process.env.PASSWORD_DB,
      database: process.env.NAME_DB,
    });
    console.log("DB Connected");
    return conn;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
