//Autores: Vasquez Miguel, Alexandra Ivana & Barandiaran Japaja, Jhossepy Alexander & Marquez Mendez, Andrea Janet.

//importa el schema y modelo de moongose
const {Schema, model, SchemaTypes} = require('mongoose');

//Crea un schema para mongodb
const CarScheduleDriverSchema = new Schema({
    dayDate: {
        type: Date,
        required: true
    },
    dayString: {
        type: String,
        required: true
    },
    driver_per_car_id:  {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "DriverPerCar"
    }
},
{
    timestamps: true
});




//crea un modelo con el nombre elegido y la coleccion donde se guardará
module.exports = model('CarScheduleDriver', CarScheduleDriverSchema, 'carSchedulesDriver');

