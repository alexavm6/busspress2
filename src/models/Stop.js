//Autores: Vasquez Miguel, Alexandra Ivana & Barandiaran Japaja, Jhossepy Alexander & Marquez Mendez, Andrea Janet.

//importa el schema y modelo de moongose
const {Schema, model, SchemaTypes} = require('mongoose');

//Crea un schema para mongodb
const StopSchema = new Schema({
    car_schedule_driver_id: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "CarScheduleDriver"
    },
    user_id:  {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "User"
    },
    pick_hour:  {
        type: Date,
        required: true
    }
},
{
    timestamps: true
});




//crea un modelo con el nombre elegido y la coleccion donde se guardará
module.exports = model('Stop', StopSchema, 'stops');

