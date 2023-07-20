require('dotenv').config();

const mongoose = require('mongoose');

const { BUSSPRESS_HOST, BUSSPRESS_DATABASE } = process.env; 
const MONGODB_URI = `mongodb://${BUSSPRESS_HOST}/${BUSSPRESS_DATABASE}`;

mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err)); 


    console.log(user_global.names)

/*

try {

    const Price = require('./models/Price.js');

    async function createPrice() {

        const PriceOne = new Price({
            name: 'User Registration',
            price: 100
        });

        await PriceOne.save().then(console.log('Guardado'));

    }

    createPrice();

} catch (e) {

    console.log(e);

}

*/


/*
try {

    const TripControl = require('./models/TripControl.js');

    async function createControl() {

        const TripControlOne = new TripControl({
            total_trips: 24,
            taken_trips: 0,
            untaken_trips: 24,
            user_id:  "64b5bcd249fbbd28ac2ac8c7"
        });

        await TripControlOne.save().then(console.log('Guardado'));

    }

    createControl();

} catch (e) {

    console.log(e);

}
*/

/*
for (let index = 0; index < 3; index++) {
    
    try {

        const CarScheduleUser = require('./models/CarScheduleUser.js');
    
        async function createCarScheduleUser() {
    
            const CarScheduleUserOne = new CarScheduleUser({
                dayDate: "2023-04-02T00:00:00.000+00:00",
                dayString: "Sabado",
                pick_hour: "2023-04-02T14:00:00.000+00:00",
                driver_per_car_id: "64a2985034b1492e3c96b00c",
                user_id: "64b5bcd249fbbd28ac2ac8c7",
            });
    
            await CarScheduleUserOne.save().then(console.log('Guardado'));
    
        }
    
        createCarScheduleUser();
    
    } catch (e) {
    
        console.log(e);
    
    }
    
}
*/


/*
for (let index = 0; index < 3; index++) {
    
    try {

        const CarScheduleDriver = require('./models/CarScheduleDriver.js');
        const Stop = require('./models/Stop.js');
    
        async function createCarScheduleDriver() {
    
            const CarScheduleDriverOne = new CarScheduleDriver({
                dayDate: "2023-04-02T00:00:00.000+00:00",
                dayString: "Sabado",
                driver_per_car_id: "64a2985034b1492e3c96b00c"
            });
    
            await CarScheduleDriverOne.save().then(console.log('Guardado'));

            const StopOne = new Stop({
                pick_hour: "2023-04-02T14:00:00.000+00:00",
                car_schedule_driver_id: CarScheduleDriverOne._id,
                user_id: "64b5bcd249fbbd28ac2ac8c7"
            });

            await StopOne.save().then(console.log('Guardado'));
    
        }
    
        createCarScheduleDriver();
    
    } catch (e) {
    
        console.log(e);
    
    }
    
}
*/


/*
try {

    const Companie = require('./models/Companie.js');

    async function createCompanie() {

        const CompanieOne = new Companie({
            name: 'Busspress',
            ruc: '11111111111'
        });

        console.log(CompanieOne);

        await CompanieOne.save().then(console.log('Guardado'));

        console.log(CompanieOne);

    }

    createCompanie();

} catch (e) {

    console.log(e.message);

}
*/

/*
try {

    const Car = require('./models/Car.js');

    async function createCars() {

        const newCar = new Car({
            license_plate_number: 'G6E-222',
            state: 'Unreserved'
        });

        console.log(newCar);

        await newCar.save().then(console.log('Guardado'));

        console.log(newCar);

    }

    createCars();

} catch (e) {

    console.log(e.message);

}
*/


/*
try {

    const Driver = require('./models/Driver.js');

    async function createDrivers() {

        const newDriver = new Driver({
            user: "D10282876",
            document_type: "Dni",
            document_number: "75524555",
            names: "Camila Fefe",
            last_names: "Milagros Pink",
            email: "camila@gmail.com",
            address: "Surco",
            phone_number: "724917482",
            gender: "F",
            age: 21,
            state: 'Out of service'
        });

        console.log(newDriver);

        await newDriver.save().then(console.log('Guardado'));

        console.log(newDriver);

    }

    createDrivers();

} catch (e) {

    console.log(e.message);

}

*/

/*    
const ClassSchedule = require('./models/ClassSchedule.js');

async function createClassSchedule() {

    const classScheduleOne = new ClassSchedule({
        day: 'Martes',
        start_hour: new Date().setHours(6-5, 30, 0),
        end_hour: new Date().setHours(8-5, 30, 0),
        class: 'Curso Integrador de Software',
        user_id: '643679fbc0a7a1b048483b41'
    });

    await classScheduleOne.save().then(console.log('Guardado'));

}

createClassSchedule();
*/

/*const TripControl = require('./models/TripControl.js');

async function createTripControl() {

    const TripControlOne = new TripControl({
        user_id: '643679fbc0a7a1b048483b41',
        total_trips: 30,
        taken_trips: 25,
        untaken_trips: 5
    });

    await TripControlOne.save().then(console.log('Guardado'));

}

createTripControl();
*/

/*
const Car = require('./models/Car.js');

async function createCar() {

    const carOne = new Car({
        license_plate_number: '222YTQQQ'
    });

    await carOne.save().then(console.log('Guardado'));

}

createCar();
*/


/*const CarScheduleUsers = require('./models/CarScheduleUsers.js');

async function createCarScheduleUsers() {

    const carScheduleUsersOne = new CarScheduleUsers({
        day: new Date('April 29, 2023'),
        drivers_per_cars_id: '555111',
        pick_hour: new Date().setHours(6-5, 00, 0),
        user_id: '643679fbc0a7a1b048483b41'
    });

    await carScheduleUsersOne.save().then(console.log('Guardado'));

}

createCarScheduleUsers();
*/

/*
const Stop = require('./models/Stop.js');

async function createStop() {

    const stopOne = new Stop({
        car_schedules_drivers_id: '7275352',
        user_id: '413338',
        pick_hour: new Date().setHours(7-5, 10, 0),
    });

    await stopOne.save().then(console.log('Guardado'));

}

createStop();
*/

/*
const CarScheduleDrivers = require('./models/CarScheduleDrivers.js');

async function createCarScheduleDrivers() {

    const CarScheduleDriversOne = new CarScheduleDrivers({
        day: new Date('April 29, 2023'),
        drivers_per_cars_id: '444444'
    });

    await CarScheduleDriversOne.save().then(console.log('Guardado'));

}

createCarScheduleDrivers();
*/

/*
const DriverPerCar = require('./models/DriverPerCar.js');

async function createDriverPerCar() {

    const DriverPerCarOne = new DriverPerCar({
        driver_id: '77777777',
        car_id: '111111'
    });

    await DriverPerCarOne.save().then(console.log('Guardado'));

}

createDriverPerCar();
*/

/*
const Driver = require('./models/Driver.js');

async function createDriver() {

    const DriverOne = new Driver({
        user: 'D122233',
        names: 'Sehun',
        last_names: 'Oh',
        document_type: 'DNI',
        document_number: '23190111',
        age: 27,
        gender: 'Hombre'
    });

    await DriverOne.save().then(console.log('Guardado'));

}

createDriver();



const Service = require('./models/Service.js');

async function createService() {

    const ServiceOne = new Service({
        start_service: new Date('April 27, 2023'),
        end_service: new Date('August 27, 2023'),
        user_or_driver_id: '643679fbc0a7a1b048483b41'
    });

    await ServiceOne.save().then(console.log('Guardado'));

}

createService();
*/




