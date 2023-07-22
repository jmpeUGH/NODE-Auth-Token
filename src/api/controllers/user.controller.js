const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const {
  validatePassword,
  validateEmail,
  usedEmail,
  usedUserName,
} = require("../../utils/validators");
const { generateSign } = require("../../utils/jwt");

const loginUser = async (req, res) => {
  //Debo comparar la contraseña con la encriptada
  try {
    const userInfo = await User.findOne({ email: req.body.email });
    console.log(req.body);
    if (
      !userInfo ||
      !bcrypt.compareSync(req.body.password, userInfo.password)
    ) {
      return res.status(400).json({ message: "Datos incorrectos" });
    }
    //console.log(userInfo.id);
    const token = generateSign(userInfo.id, userInfo.email);
    //console.log(token);
    //Debo enviar el token con la información del usuario
    return res.status(200).json({ token, userInfo });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const registerUser = async (req, res) => {
  try {
    const newUser = new User(req.body);

    //Los validadores los definimos en utils y debemos aplicarlos antes de encriptar

    if (!validatePassword(newUser.password)) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }
    if (!validateEmail(newUser.email)) {
      return res.status(400).json({ message: "Formato email incorrecto" });
    }
    if ((await usedEmail(newUser.email)) > 0) {
      //OJO: Esta función es asíncrona porque así está definida en el validators
      return res
        .status(400)
        .json({ message: "Email ya registrado. No se puede dar de alta" });
    }
    if ((await usedUserName(newUser.username)) > 0) {
      //OJO: Esta función es asíncrona porque así está definida en el validators
      return res
        .status(400)
        .json({ message: "Username ya registrado. No se puede dar de alta" });
    }

    //Para poder encriptar la contraseña, debo importar la librería y usarla:

    newUser.password = bcrypt.hashSync(newUser.password, 10);

    const createdUser = await newUser.save();
    return res.status(200).json(createdUser);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const checkSession = async (req, res) => {
  try {
    res.status(200).json(req.user); //Este user lo recibo desde auth.js una vez verificado el token
  } catch (error) {
    return res.status(500).json(error);
  }
};
const adminRole = async (req, res) => {
  try {
    res.status(200).json(req.user); //Este user lo recibo desde auth.js una vez verificado el token
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = { loginUser, registerUser, checkSession, adminRole };
