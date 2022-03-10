const mysql = require("mysql");
const dbConfig = require('../config/db.config.js');
const https = require('https');

// Create a connection to the database

var dbConfiguration = {
    host : dbConfig.HOST,
    user : dbConfig.USER,
    password: dbConfig.PASSWORD,
    database : dbConfig.DB,
    port : dbConfig.PORT,
    connectionLimit : 20, // The maximum number of connections to create at once
    // ssl : {
    //     ca : SET UP CERTIFICATE 
    // }
    debug : false
}

var connectionPool = mysql.createPool(dbConfiguration);

connectionPool.on('connection',()=> {
    console.log("New connection to the database.");
});

module.exports = connectionPool;