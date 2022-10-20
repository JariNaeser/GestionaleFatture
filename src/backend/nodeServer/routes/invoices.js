const escaper = require("./../helper/Escaper");
const config = require("./../config/config.js");
const jwt = require('jsonwebtoken');

module.exports = function(app, connection){

    app.get('/getInvoices', authenticateToken, function (req, res){
        connection.query("SELECT * FROM Invoice;", (error, result) => {
            if(error) throw error;
            res.json(result);
        });
    });

    app.get('/getInvoice/:id', authenticateToken, function (req, res){
        id = escape(req.params.id);
        connection.query(`SELECT * FROM Invoice WHERE id = ?;`, [id], (error, result) => {
            if(error) throw error;
            res.json(result);
        });
    });
    
};

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
 
    if(token == null) return res.sendStatus(401);
 
    jwt.verify(token, config.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}