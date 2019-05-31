'use strict';
const mysql = require('mysql2/promise');
const { mysqlConfig } = require('./config');

const dbPool = mysql.createPool(mysqlConfig);
const query = async (query) => {
  try {
    const connection = await dbPool.getConnection(async conn => conn);
    try {
	  const [rows] = await connection.query(query);

      return rows;
    } catch (err) {
      throw err;
    } finally {
      connection.release();
    }
  } catch (err) {
    throw err;
  }
};

module.exports = query;