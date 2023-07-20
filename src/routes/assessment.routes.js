//Autores: Vasquez Miguel, Alexandra Ivana & Barandiaran Japaja, Jhossepy Alexander & Marquez Mendez, Andrea Janet.

//importa un enrutador
const { Router } = require('express');
const router = Router();

const { isAuthenticated } = require('../helpers/auth');

//importa las funciones que hará el enrutador dependiendo de la ruta
const { 
    renderAssessmentDriver,
    assessmentDriver,
    renderAssessmentSchedule,
    assessmentSchedule
} = require('../controllers/assessment.controller');



//router.post('/user/login', login);

router.get('/assessment/driver/:id', isAuthenticated, renderAssessmentDriver);

router.post('/assessment/driver/:id', isAuthenticated, assessmentDriver);



router.get('/assessment/carscheduleuser/:id', isAuthenticated, renderAssessmentSchedule);

router.post('/assessment/carscheduleuser/:id', isAuthenticated, assessmentSchedule);



module.exports = router;