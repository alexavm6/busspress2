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
const CarScheduleUser = require('../models/CarScheduleUser');
const DriverPerCar = require('../models/DriverPerCar');
const DriverInService = require('../models/DriverInService');
const InstitutionCar = require('../models/InstitutionCar');



const PDF = require('pdfkit-construct');


//crea un objeto donde iran los metodos
const generatePdfCtrl = {};


generatePdfCtrl.dashboardpdf = async (req, res) => {

    try{
        

        
    }catch(e){
        
    }

};

generatePdfCtrl.carscheduleuserpdf = async (req, res) => {

    try{

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
        


        const user = req.user;

        const doc = new PDF({bufferPage: true});

        const filename = `CarSchedulesUser_${user.last_names}_${user.names}_${Date.now()}.pdf`;

        const stream = res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-disposition': `attachment;filename=${filename}`
        });

        doc.on('data', (data) => {stream.write(data)});
        doc.on('end', () => {stream.end()});

        


        const content = [];

        for (const carSchedule of carSchedulesArray) {

            const contentObj = {
                dayString: carSchedule.carScheduleUser.dayString,
                dayDate: carSchedule.carScheduleUser.dayDate,
                pickHour: carSchedule.carScheduleUser.pick_hour,
                driver: carSchedule.driverPerCar.driver_in_service_id.names + ", " + carSchedule.driverPerCar.driver_in_service_id.last_names,
                plate: carSchedule.driverPerCar.institution_car_id.license_plate_number
            };

            content.push(contentObj);

        }


        doc.setDocumentHeader({
            height: '25%'
        }, () => {
            
            doc.fontSize(15).text('Rutas', {
                width: 420,
                align: 'center'
            });

            doc.fontSize(12);

            doc.text(`Usuario: ${user.user}`, {
                width: 420,
                align: 'left'
            });

            doc.text(`Nombres: ${user.names}`, {
                width: 420,
                align: 'left'
            });

            doc.text(`Apellidos: ${user.last_names}`, {
                width: 420,
                align: 'left'
            });

            doc.text(`Correo: ${user.email}`, {
                width: 420,
                align: 'left'
            });

            doc.text(`Carrera: ${user.college_career}`, {
                width: 420,
                align: 'left'
            });

        });



        doc.addTable([
            {key: 'dayString', label: 'Día', align: 'left'},
            {key: 'dayDate', label: 'Día', align: 'left'},
            {key: 'pickHour', label: 'Hora de Recogo', align: 'left'},
            {key: 'driver', label: 'Counductor', align: 'left'},
            {key: 'plate', label: 'Matrícula', align: 'left'},
        ], content, {
            border: null,
            width: "fill_body",
            striped: true,
            stripedColors: ["#7196AB", "#9BB6C6"],
            cellsPadding: 5,
            marginLeft: 45,
            marginRight: 45,
            headAlign: 'center'
        });


        doc.render();
        doc.end();

        req.flash('success_msg', 'PDF generado exitosamente');
        res.redirect('/dashboard/routes');

    }catch(e){
        console.log(e);
    }

};




module.exports = generatePdfCtrl;