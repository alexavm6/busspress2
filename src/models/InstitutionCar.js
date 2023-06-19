//Autores: Vasquez Miguel, Alexandra Ivana & Barandiaran Japaja, Jhossepy Alexander & Marquez Mendez, Andrea Janet.

//importa el schema y modelo de moongose
const {Schema, model, SchemaTypes} = require('mongoose');

//Crea un schema para mongodb
const InstitutionCarSchema = new Schema({
    license_plate_number: {
        type: String,
        required: true
    },
    institution_id:  {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "Institution"
    }
});




//crea un modelo con el nombre elegido y la coleccion donde se guardará
module.exports = model('InstitutionCar', InstitutionCarSchema, 'institutionCars');

