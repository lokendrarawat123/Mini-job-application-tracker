//  for devlopment
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();
const db = await mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});
export default db;
// for the deployment

// import mysql from "mysql2/promise";
// import dotenv from "dotenv";
// dotenv.config();

// const db = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: process.env.PORT || 5000,
//   ssl: { rejectUnauthorized: false }, // 🌟 अनलाइनका लागि यो अनिवार्य छ
// });
// export default db;
