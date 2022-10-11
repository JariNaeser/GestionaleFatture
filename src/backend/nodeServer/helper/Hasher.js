const config = require("./../config/config.js");
const bcrypt = require ('bcrypt');

function hash(string){
    //string += config.HASH_SALT;

    //Use SHA-256
    string = bcrypt.hash(string, config.HASH_SALT);

    return string;
}

module.exports = { hash };