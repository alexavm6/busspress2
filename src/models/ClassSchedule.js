//Autores: Vasquez Miguel, Alexandra Ivana & Barandiaran Japaja, Jhossepy Alexander & Marquez Mendez, Andrea Janet.

//importa el schema y modelo de moongose
const {Schema, model, SchemaTypes} = require('mongoose');


//Crea un schema para mongodb
const ClassScheduleSchema = new Schema({
    day:  {
        type: String,
        required: true
    },
    start_hour:  {
        type: Date,
        required: true
    },
    end_hour: {
        type: Date,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    user_id:  {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "User"
    }
},
{
    timestamps: true
});




//crea un modelo con el nombre elegido y la coleccion donde se guardará
module.exports = model('ClassSchedule', ClassScheduleSchema, 'classSchedules');

