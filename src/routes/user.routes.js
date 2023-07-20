//Autores: Vasquez Miguel, Alexandra Ivana & Barandiaran Japaja, Jhossepy Alexander & Marquez Mendez, Andrea Janet.

//importa un enrutador
const { Router } = require('express');
const router = Router();

const { isAuthenticated } = require('../helpers/auth');

//importa las funciones que hará el enrutador dependiendo de la ruta
const { 
    renderLogin,
    login, 
    logout,
    renderSignup,
    signupForm1,
    signupForm2
} = require('../controllers/user.controller');

//dependiendo de la ruta que ingrese renderizará una vista
router.get('/user/login', renderLogin);

router.post('/user/login', login);

router.get('/user/logout', isAuthenticated, logout);

router.get('/user/signup', renderSignup);

router.post('/user/signupform1', signupForm1);

router.post('/user/signupform2', signupForm2);



module.exports = router;