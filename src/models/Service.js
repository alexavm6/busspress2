//Autores: Vasquez Miguel, Alexandra Ivana & Barandiaran Japaja, Jhossepy Alexander & Marquez Mendez, Andrea Janet.

//importa el schema y modelo de moongose
const {Schema, model} = require('mongoose');

//Crea un schema para mongodb
const ServiceSchema = new Schema({
    start_service: {
        type: Date,
        required: true
    },
    end_service: {
        type: Date,
        required: true
    },
    user_or_driver_id: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});




//crea un modelo con el nombre elegido y la coleccion donde se guardará
module.exports = model('Service', ServiceSchema, 'services');

