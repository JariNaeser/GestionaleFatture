const config = require("./../config/config.js");
const jwt = require('jsonwebtoken');
const { check } = require('express-validator');

module.exports = function(app, connection){

    app.post('/login', [
        check('username').trim().escape(),
        check('password').trim().escape(),
      ], function (req, res){

        // Escape and hash
        const username = req.body.username;
        const password = req.body.password;

        connection.query(`SELECT id FROM User WHERE username LIKE ? AND password LIKE ?;`, [username, password], function(error, results){
            if (error) throw error;
            //Check if user has been found
            const userId = results[0] && results[0]['id'];
            if(userId){
                // Generate new Token 
                const newToken = jwt.sign(
                    { userId: userId, username: username },
                    config.ACCESS_TOKEN_SECRET,
                    { expiresIn: '1d' }
                );
                // Store new token
                connection.query(`INSERT INTO UserToken VALUES(?, NOW(), ?) ON DUPLICATE KEY UPDATE creationDate = NOW(), value = ?;`, [userId, newToken, newToken], function(error, results){
                    if (error) throw error;
                });
                res.status(200).json({ accessToken: newToken });
            }else{
                res.status(400).json({ status: 'Bad Request' });
            }
        });
    });
};
