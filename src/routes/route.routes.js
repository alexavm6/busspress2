//Autores: Vasquez Miguel, Alexandra Ivana & Barandiaran Japaja, Jhossepy Alexander & Marquez Mendez, Andrea Janet.

//importa un enrutador
const { Router } = require('express');
const router = Router();

const { isAuthenticated } = require('../helpers/auth');

//importa las funciones que hará el enrutador dependiendo de la ruta
const { 
    tripTaked
} = require('../controllers/route.controller');

//dependiendo de la ruta que ingrese renderizará una vista
//router.get('/user/login', renderLogin);

router.post('/route/triptaked', tripTaked);



module.exports = router;