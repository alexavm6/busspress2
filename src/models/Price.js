//Autores: Vasquez Miguel, Alexandra Ivana & Barandiaran Japaja, Jhossepy Alexander & Marquez Mendez, Andrea Janet.

//importa el schema y modelo de moongose
const {Schema, model} = require('mongoose');

//Crea un schema para mongodb
const PriceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price:  {
        type: Number,
        required: true
    }
},
{
    timestamps: true
});

//crea un modelo con el nombre elegido y la coleccion donde se guardará
module.exports = model('Price', PriceSchema, 'prices');

