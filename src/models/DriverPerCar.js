//Autores: Vasquez Miguel, Alexandra Ivana & Barandiaran Japaja, Jhossepy Alexander & Marquez Mendez, Andrea Janet.

//importa el schema y modelo de moongose
const {Schema, model, SchemaTypes} = require('mongoose');

//Crea un schema para mongodb
const DriverPerCarSchema = new Schema({
    driver_in_service_id:  {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "DriverInService"
    },
    institution_car_id:  {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "InstitutionCar"
    }
},
{
    timestamps: true
});




//crea un modelo con el nombre elegido y la coleccion donde se guardará
module.exports = model('DriverPerCar', DriverPerCarSchema, 'driversPerCars');

