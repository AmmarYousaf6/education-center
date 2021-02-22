var pg = require('pg');
const { Client } = require('pg');
require('dotenv').config();
const client = new Client({
    user: process.env.DB_USER_PROD,
    host: process.env.DB_HOST_PROD,
    database: process.env.DB_DATABASE_PROD,
    password: process.env.DB_PASSWORD_PROD,
    port: process.env.DB_PORT_PROD,
});

client.connect().then((result) => console.log('Database connection successful')).catch((err) => console.log(err));

module.exports = {
    database: client
}