const { Pool } = require('pg');
require('dotenv').config({ path: './.env' });

var pool = undefined;
const connectionString = process.env.DATABASE_URL;

if (connectionString) {

    const config = {
        connectionString,
        ssl: {
            rejectUnauthorized: false,
        },
    }

    pool = new Pool(config);
}
else {
    pool = new Pool({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: 5432,
    });
}
pool.connect();

module.exports = pool;
