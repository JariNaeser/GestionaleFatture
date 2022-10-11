const express = require('express');
const app = express();
const config = require("./config/config.js");
const mysql = require('mysql');


const connection = mysql.createConnection({
   host: config.DATABASE.HOST,
   user: config.DATABASE.USER,
   password: config.DATABASE.PASSWORD,
   database: config.DATABASE.DATABASE,
   port: config.DATABASE.PORT
});

// connection.connect(function(err) {
//    if (err) throw err;
//    console.log("Connected to the database!");
// });

// const cors = require("cors");

// var corsOptions = {
//    origin: "http://localhost:8081"
// };
 
// app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

// Routes

app.get('/', function (req, res) {
   res.send('GestionaleFatture backend server');
});

//require('./routes/home.js')(app);
require('./routes/login.js')(app, connection);

const server = app.listen(config.SERVER_PORT, () => console.log(`Server running on port ${config.SERVER_PORT}...`));




