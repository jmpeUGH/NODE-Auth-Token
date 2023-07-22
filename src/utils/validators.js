const User = require('../api/models/user.model')


const validatePassword = (pass) => {
    const regex =
        //
        // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    return regex.test(pass);
};

const validateEmail = (email) => {
    const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //Regex email
    return regex.test(email);
};

//Para poder hacer la validación de email, debo recorrer los ya existentes en la base de datos.
//Debo empezar por importar el modelo de datos.

const usedEmail = async (email)=>{

    const users = await User.find({email:email});
    //El primer email es el que recibo en el find y, el segundo es el debo comprobar y que recibo por parámetros 
    //lo que recibo es un ARRAY de objetos que cumplen con esa condición. Si no hay objetos que la cumplan, la longitud del array es 0.
    return users.length;
};

const usedUserName = async (username)=>{

    const users = await User.find({username:username});
    //El primer email es el que recibo en el find y, el segundo es el debo comprobar y que recibo por parámetros 
    //lo que recibo es un ARRAY de objetos que cumplen con esa condición. Si no hay objetos que la cumplan, la longitud del array es 0.
    return users.length;
}

module.exports = { validatePassword, validateEmail, usedEmail, usedUserName }