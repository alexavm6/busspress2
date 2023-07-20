//Autores: Vasquez Miguel, Alexandra Ivana & Barandiaran Japaja, Jhossepy Alexander & Marquez Mendez, Andrea Janet.

//importa el schema y modelo de moongose
const {Schema, model, SchemaTypes} = require('mongoose');
const bcrypt = require('bcryptjs'); 

//Crea un schema para mongodb
const InstitutionStudentClassScheduleSchema = new Schema({
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
    institution_student_id:  {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "InstitutionStudent"
    }
},
{
    timestamps: true
});




//crea un modelo con el nombre elegido y la coleccion donde se guardará
module.exports = model('InstitutionStudentClassSchedule', InstitutionStudentClassScheduleSchema, 'institutionStudentClassSchedules');

