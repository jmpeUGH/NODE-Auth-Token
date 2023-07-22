const jwt = require('jsonwebtoken');

//Tengo que crear my key con el que crearé y firmaré tokens.

//Necesito ahora dos funciones: una para crear el token y otra para comprobarlo:

const generateSign = (id,email)=>{
    //id e email son los correspondientes al usuario que solicuta el token
    //El tercer parámetro es la duración del token
    return jwt.sign({id,email}, process.env.JWT_KEY, {expiresIn:"1h"});
}

const verifySign = (token)=>{
    return jwt.verify(token, process.env.JWT_KEY);
}

module.exports = {generateSign, verifySign};