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


//crea un objeto donde iran los metodos
const routeCtrl = {};

//importa modulo passport
const passport = require('passport');
const nodemailer = require('nodemailer');







routeCtrl.tripTaked = async (req, res) => {

    try{
        const user_id = req.user._id;
        const tripControl = await TripControl.findOne({user_id: user_id});
        console.log(tripControl)
        
        const tripControl_id = tripControl._id;

        const increase = parseInt(tripControl.taken_trips) + 1;
        const decrease = parseInt(tripControl.untaken_trips) - 1;

        const tripControlUpdated = await TripControl.findByIdAndUpdate(tripControl_id, {
            taken_trips: increase,
            untaken_trips: decrease
        });

        console.log(tripControlUpdated)

        req.flash('success_msg', 'Viaje tomado registrado con exito');
        res.redirect('/dashboard/routes');
        
    }catch(e){
        console.log(e);
    }

};




module.exports = routeCtrl;