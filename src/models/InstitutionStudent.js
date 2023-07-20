//Autores: Vasquez Miguel, Alexandra Ivana & Barandiaran Japaja, Jhossepy Alexander & Marquez Mendez, Andrea Janet.

//importa el schema y modelo de moongose
const {Schema, model, SchemaTypes} = require('mongoose');
const bcrypt = require('bcryptjs'); 

//Crea un schema para mongodb
const InstitutionStudentSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    document_type:  {
        type: String,
        required: true
    },
    document_number:  {
        type: String,
        required: true
    },
    names:  {
        type: String,
        required: true
    },
    last_names:  {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address:  {
        type: String,
        required: true
    },
    campus:  {
        type: String,
        required: true
    },
    phone_number:  {
        type: String,
        required: true
    },
    college_career:  {
        type: String,
        required: true
    },
    course:  {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    institution_id:  {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "Institution"
    }
},
{
    timestamps: true
});




//crea un modelo con el nombre elegido y la coleccion donde se guardará
module.exports = model('InstitutionStudent', InstitutionStudentSchema, 'institutionStudents');

