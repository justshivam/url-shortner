const { Pool } = require('pg');
require('dotenv').config({ path: './.env' });

var pool = undefined;
const connectionString = process.env.DATABASE_URL;

if (connectionString) {
    pool = new Pool({
        connectionString,
        ssl: process.env.DB_SSL === 1
    })
}
else {
    pool = new Pool({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: 5432,
        ssl: process.env.DB_SSL === 1
    });
}

module.exports = pool;
