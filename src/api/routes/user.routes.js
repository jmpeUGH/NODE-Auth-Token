const express = require('express');

const {loginUser, registerUser, checkSession, adminRole } = require('../controllers/user.controller');

//Para validar usuarios debo importar los ficheros del MIDDLEWARE

const { isAuth, isAdmin } = require('../../middlewares/auth');

const router = express.Router();

router.post('/login', loginUser);

//router.post('/login', () => {console.log("Este es mi login")});

router.post('/register', registerUser)
//router.post('/register', () => {console.log("Este es mi register")});

router.post('/checkSession', [isAuth], checkSession);

router.post('/admin', [isAdmin], adminRole);

module.exports=router;