const mysql = require('mysql2');
const express = require('express');

module.exports = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Faizan.toper1',
    database: 'proj'
});
