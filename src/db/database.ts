import mysql from 'mysql2';
import config from '@/utils/config.js';

const { host, user, database, password } = config.db;

const pool = mysql.createPool({
	host,
	user,
	database,
	password
});

const db = pool.promise();

export default db;
