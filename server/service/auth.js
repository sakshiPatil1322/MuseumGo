const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = "jujutsu";


function setUser(user){
    return jwt.sign(user,secretKey,{expiresIn: '1500s'});
}

function getUser(token){
    try {
        return jwt.verify(token, secretKey);
    } catch (err) {
        return null; 
    }
}

const decodeToken = (token) => {
    try {
        return jwt.verify(token, 'your_jwt_secret_key'); // Replace with your secret key
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
};

module.exports = {
    setUser,
    getUser,
    decodeToken,
}