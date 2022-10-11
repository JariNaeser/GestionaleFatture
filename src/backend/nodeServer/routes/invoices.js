const escaper = require("./../helper/Escaper");
const config = require("./../config/config.js");
const jwt = require('jsonwebtoken');

module.exports = function(app, connection){

    app.get('/getInvoices', function (req, res){
        connection.query("SELECT * FROM Invoice;", (error, result) => {
            if(error) throw error;
            res.json(result);
        });
    });

    app.get('/getInvoice/:id', function (req, res){
        id = escape(req.params.id);
        connection.query(`SELECT * FROM Invoice WHERE id = ${id};`, (error, result) => {
            if(error) throw error;
            res.json(result);
        });
    });
    
};
