//Autores: Vasquez Miguel, Alexandra Ivana & Barandiaran Japaja, Jhossepy Alexander & Marquez Mendez, Andrea Janet.

//importa un enrutador
const { Router } = require('express');
const router = Router();

//importa las funciones que hará el enrutador dependiendo de la ruta
const { 
    renderSignup,
    signupForm1,
    signupForm2,
    
} = require('../controllers/institution.controller');

/*
const { 
    uploadStudentJsons,
    uploadDateJsons
} = require('../helpers/multer.helper');
*/

//dependiendo de la ruta que ingrese renderizará una vista
router.get('/institution/signup', renderSignup);

router.post('/institution/signupform1', signupForm1);

router.post('/institution/signupform2', signupForm2);

//router.post('/institution/signupform3', signupForm3);

//router.post('/institution/signupform4', signupForm4);


//router.post('/institution/signupform3', uploadStudentJsons, signupForm3);

//router.post('/institution/signupform4', uploadDateJsons, signupForm4);


module.exports = router;