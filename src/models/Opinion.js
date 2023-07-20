//Autores: Vasquez Miguel, Alexandra Ivana & Barandiaran Japaja, Jhossepy Alexander & Marquez Mendez, Andrea Janet.

//importa el schema y modelo de moongose
const {Schema, model, SchemaTypes} = require('mongoose');

//Crea un schema para mongodb
const OpinionSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    car_schedule_user_id: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "CarScheduleUser"
    }
},
{
    timestamps: true
});




//crea un modelo con el nombre elegido y la coleccion donde se guardará
module.exports = model('Opinion', OpinionSchema, 'opinions');

