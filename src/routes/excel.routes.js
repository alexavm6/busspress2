//Autores: Vasquez Miguel, Alexandra Ivana & Barandiaran Japaja, Jhossepy Alexander & Marquez Mendez, Andrea Janet.

//importa un enrutador
const { Router } = require('express');
const router = Router();

const { isAuthenticated } = require('../helpers/auth');

//importa las funciones que hará el enrutador dependiendo de la ruta
const { 
    dashboardexcel,
    carscheduleuserexcel
} = require('../controllers/generateexcel.controller');

//dependiendo de la ruta que ingrese renderizará una vista
//router.get('/user/login', renderLogin);

router.get('/generateexcel/dashboard', isAuthenticated, dashboardexcel);

router.get('/generateexcel/carscheduleuser', isAuthenticated, carscheduleuserexcel);



module.exports = router;