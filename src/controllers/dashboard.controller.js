//Autores: Vasquez Miguel, Alexandra Ivana & Barandiaran Japaja, Jhossepy Alexander & Marquez Mendez, Andrea Janet.

//crea un objeto donde iran los metodos
const dashboardCtrl = {};

//importa los modelos a usar
const Car = require('../models/Car');
const CarScheduleDriver = require('../models/CarScheduleDriver');
const CarScheduleUser = require('../models/CarScheduleUser');
const ClassSchedule = require('../models/ClassSchedule');
const Driver = require('../models/Driver');
const DriverPerCar = require('../models/DriverPerCar');
const DriverInService = require('../models/DriverInService');
const Stop = require('../models/Stop');
const TripControl = require('../models/TripControl');
const User = require('../models/User');
const Institution = require('../models/Institution');
const InstitutionCar = require('../models/InstitutionCar');

//por cada direccion renderiza una vista diferente
dashboardCtrl.renderDashboard = async (req, res) => {
    const institution = await Institution.findById(req.user.institution_id);
    const institutionName = institution.name;


    const user_id = req.user._id;
    const tripControl = await TripControl.findOne({user_id: user_id});

    res.render('dashboard/dashboard', {institutionName, tripControl});
};

dashboardCtrl.renderRoutes = async (req, res) => {
    const carSchedulesArray = [];

    const user_id = req.user._id;
    const carSchedulesUser = await CarScheduleUser.find({user_id: user_id});

    for (const carScheduleUser of carSchedulesUser) {

        const carSchedulesObj = {};
        //console.log(carScheduleUser)

        carSchedulesObj.carScheduleUser = carScheduleUser;

        const driverPerCarArray = await DriverPerCar.find({_id: carScheduleUser.driver_per_car_id}).populate({ path: 'driver_in_service_id', model: DriverInService}).populate({ path: 'institution_car_id', model: InstitutionCar});
        const driverPerCar = driverPerCarArray[0];

        carSchedulesObj.driverPerCar = driverPerCar;
        

        carSchedulesArray.push(carSchedulesObj);
        
    }
    //console.log(carSchedulesArray)

    
    res.render('dashboard/routes',{carSchedulesArray});
};

dashboardCtrl.renderStatistics = async (req, res) => {
    const control = await TripControl.find({user_id: req.user._id});
    res.render('dashboard/statistics', {control});
};

dashboardCtrl.renderAssessment = async (req, res) => {

    const carSchedulesArray = [];

    const user_id = req.user._id;
    const carSchedulesUser = await CarScheduleUser.find({user_id: user_id});

    for (const carScheduleUser of carSchedulesUser) {

        const carSchedulesObj = {};
        //console.log(carScheduleUser)

        carSchedulesObj.carScheduleUser = carScheduleUser;

        const driverPerCarArray = await DriverPerCar.find({_id: carScheduleUser.driver_per_car_id}).populate({ path: 'driver_in_service_id', model: DriverInService}).populate({ path: 'institution_car_id', model: InstitutionCar});
        const driverPerCar = driverPerCarArray[0];

        carSchedulesObj.driverPerCar = driverPerCar;
        

        carSchedulesArray.push(carSchedulesObj);
        
    }
    

    res.render('dashboard/assessment', {carSchedulesArray});
};

dashboardCtrl.renderSchedule = async (req, res) => {

    const user_id = req.user._id;
    const classSchedules = await ClassSchedule.find({user_id: user_id});

    res.render('dashboard/schedule', {classSchedules});
};

dashboardCtrl.renderFirstSteps = async (req, res) => {
    
    res.render('dashboard/firstSteps');
};



module.exports = dashboardCtrl;