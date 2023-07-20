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


const fs = require('fs');
const xl = require('excel4node');
const path = require('path');




//crea un objeto donde iran los metodos
const generateExcelCtrl = {};


generateExcelCtrl.dashboardexcel = async (req, res) => {

    try{
        

        
    }catch(e){
        
    }

};

generateExcelCtrl.carscheduleuserexcel = async (req, res) => {

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
        
        console.log(carSchedulesArray)


        const content = [];

        for (const carSchedule of carSchedulesArray) {

            console.log("----------",carSchedule.carScheduleUser.dayString);

            const contentObj = {
                dayString: carSchedule.carScheduleUser.dayString.toString(),
                dayDate: carSchedule.carScheduleUser.dayDate.toString(),
                pickHour: carSchedule.carScheduleUser.pick_hour.toString(),
                driver: carSchedule.driverPerCar.driver_in_service_id.names + ", " + carSchedule.driverPerCar.driver_in_service_id.last_names,
                plate: carSchedule.driverPerCar.institution_car_id.license_plate_number.toString()
            };

            content.push(contentObj);

        }

        console.log(content)

        const user = req.user;


        var wb = new xl.Workbook();
        let nombreArchivo = `CarSchedulesUser_${user.last_names}_${user.names}_${Date.now()}`;
        var ws = wb.addWorksheet(nombreArchivo);

        // Crear estilos
        var cualColumnaEstilo = wb.createStyle({
            font: {
                name: 'Arial',
                color: '#000000',
                size: 12,
                bold: true,
            }
        });

        var contenidoEstilo = wb.createStyle({
            font: {
                name: 'Arial',
                color: '#494949',
                size: 11,
            }
        });


        //Nombres de las columnas
        ws.cell(1, 1).string("Día").style(cualColumnaEstilo);
        ws.cell(1, 2).string("Fecha").style(cualColumnaEstilo);
        ws.cell(1, 3).string("Hora de Recogo").style(cualColumnaEstilo);
        ws.cell(1, 4).string("Conductor").style(cualColumnaEstilo);
        ws.cell(1, 5).string("Matrícula").style(cualColumnaEstilo);


        let cualFila = 2;

        for(let i=0; i<content.length; i++){

            let contentActual = content[i]; 
    
            console.log(contentActual);
            
            ws.cell(cualFila, 1).string(contentActual.dayString).style(contenidoEstilo);
            
            ws.cell(cualFila, 2).string(contentActual.dayDate).style(contenidoEstilo);
            
            ws.cell(cualFila, 3).string(contentActual.pickHour).style(contenidoEstilo);
            
            ws.cell(cualFila, 4).string(contentActual.driver).style(contenidoEstilo);
            
            ws.cell(cualFila, 5).string(contentActual.plate).style(contenidoEstilo);
    
            
            cualFila = cualFila + 1;
        }


        //Ruta del archivo
        //const pathExcel = path.join(__dirname, 'excel', nombreArchivo + '.xlsx');

        const pathExcel = path.join("C:", "Users", "Usuario", "Downloads", nombreArchivo + '.xlsx');

        //Escribir o guardar
        wb.write(pathExcel, function(err, stats){
            if(err) console.log(err);
            else{

                // Crear función y descargar archivo
                function downloadFile(){res.download(pathExcel);}
                downloadFile();

                console.log("Archivo descargado");

                /*
                // Borrar archivo
                fs.rm(pathExcel, function(err){
                    if(err) console.log(err);
                    else  console.log("Archivo descargado y borrado del servidor correctamente");
                });
                */
            }
        });

        

        req.flash('success_msg', 'Excel generado exitosamente');
        res.redirect('/dashboard/routes');

    }catch(e){
        console.log(e);
    }

};




module.exports = generateExcelCtrl;