require('dotenv').config();
let db;
if (process.env.DATABASE_TYPE=='sqlite') db = require('./sqlite');
else if (process.env.DATABASE_TYPE=='mysql') db = require('./mysql');
else {process.exit(1);}
module.exports = db;