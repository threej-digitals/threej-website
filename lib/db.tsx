import mysql from "mysql2/promise";

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: process.env.HOST,
  port: +(process.env.MYSQLPORT || 3306),
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

//library function to handle database queries
export const query = async (sql: string, values?: any): Promise<any> => {
  const connection = await pool.getConnection();
  try {
    const [rows, fields] = await connection.query(sql, values);
    return [rows, fields] as const;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  } finally {
    connection.release();
  }
};
