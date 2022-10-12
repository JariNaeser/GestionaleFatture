const express = require('express');
const app = express();
const config = require("./config/config.js");
const mysql = require('mysql');
const cors = require("cors");

// MySQL
const connection = mysql.createConnection({
   host: config.DATABASE.HOST,
   user: config.DATABASE.USER,
   password: config.DATABASE.PASSWORD,
   database: config.DATABASE.DATABASE,
   port: config.DATABASE.PORT
});

// CORS
var corsOptions = { origin: "*" };
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); 
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); 

// Default route
app.get('/', function (req, res) {
   res.send('GestionaleFatture backend server');
});

// Routes
require('./routes/login.js')(app, connection);
require('./routes/invoices.js')(app, connection);

const server = app.listen(config.SERVER_PORT, () => console.log(`Server running on port ${config.SERVER_PORT}...`));




