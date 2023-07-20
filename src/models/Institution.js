//Autores: Vasquez Miguel, Alexandra Ivana & Barandiaran Japaja, Jhossepy Alexander & Marquez Mendez, Andrea Janet.

//importa el schema y modelo de moongose
const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');

//Crea un schema para mongodb
const InstitutionSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    acronym:  {
        type: String,
        required: true
    },
    ruc: {
        type: String,
        required: true
    },
    weeksPerCycle:  {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cycles:  {
        type: Number,
        required: true
    },
    password:  {
        type: String,
        required: true
    },
    cars:  {
        type: Number,
        required: true
    }
},
{
    timestamps: true
});

InstitutionSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

InstitutionSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

//crea un modelo con el nombre elegido y la coleccion donde se guardará
module.exports = model('Institution', InstitutionSchema, 'institutions');

