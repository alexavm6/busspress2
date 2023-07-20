//Autores: Vasquez Miguel, Alexandra Ivana & Barandiaran Japaja, Jhossepy Alexander & Marquez Mendez, Andrea Janet.
//importa los modelos a usar
const User = require('../models/User');
const Institution = require('../models/Institution');
const InstitutionStudent = require('../models/InstitutionStudent');
const CycleScheduleByInstitution = require('../models/CycleScheduleByInstitution');
const InstitutionStudentClassSchedule = require('../models/InstitutionStudentClassSchedule');
const UserService = require('../models/UserService');
const Price = require('../models/Price');
const UserTicket = require('../models/UserTicket');
const UserTicketDetail = require('../models/UserTicketDetail');
const ClassSchedule = require('../models/ClassSchedule');
const Companie = require('../models/Companie');
const TripControl = require('../models/TripControl');
const DriverInService = require('../models/DriverInService');


//crea un objeto donde iran los metodos
const assessmentCtrl = {};

//importa modulo passport
const passport = require('passport');
const nodemailer = require('nodemailer');
const CarScheduleUser = require('../models/CarScheduleUser');
const Opinion = require('../models/Opinion');

assessmentCtrl.renderAssessmentDriver = async (req, res) => {

    try{

        const driver_id = req.params.id;
        const driverInService = await DriverInService.findById(driver_id);

        console.log(driverInService);

        res.render('assessment/driver', {driverInService});

    }catch(e){
        console.log(e);
    }

};

assessmentCtrl.assessmentDriver = async (req, res) => {

    try{
        const driver_id = req.params.id;
        const {amount} = req.body;
        console.log(req.body)

        const driver = await DriverInService.findById(driver_id);
        console.log(driver)

        const increase = parseInt(driver.score) + parseInt(amount);
        console.log(increase)
        
        const tripControlUpdated = await DriverInService.findByIdAndUpdate(driver_id, {
            score: increase
        });

        req.flash('success_msg', 'Evaluacion enviada con exito');
        res.redirect('/dashboard/assessment');
        
    }catch(e){
        console.log(e);
    }

};







assessmentCtrl.renderAssessmentSchedule = async (req, res) => {

    try{

        const car_schedule_user_id = req.params.id;
        const carScheduleUser = await CarScheduleUser.findById(car_schedule_user_id);

        console.log(carScheduleUser);

        res.render('assessment/carScheduleUser', {carScheduleUser});

    }catch(e){
        console.log(e);
    }

};

assessmentCtrl.assessmentSchedule = async (req, res) => {

    try{
        
        const car_schedule_user_id = req.params.id;
        const {score, description} = req.body;

        const opinion = new Opinion({
            description: description,
            score: parseInt(score),
            car_schedule_user_id: car_schedule_user_id
        });

        await opinion.save();
        console.log(opinion);

        req.flash('success_msg', 'Evaluacion enviada con exito');
        res.redirect('/dashboard/assessment');
        
    }catch(e){
        console.log(e);
    }

};




module.exports = assessmentCtrl;