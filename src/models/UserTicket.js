//Autores: Vasquez Miguel, Alexandra Ivana & Barandiaran Japaja, Jhossepy Alexander & Marquez Mendez, Andrea Janet.

//importa el schema y modelo de moongose
const {Schema, model, SchemaTypes} = require('mongoose');

//Crea un schema para mongodb
const UserTicketSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    description:  {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    companie_id:  {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "Companie"
    },
    user_id: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "User"
    }
},
{
    timestamps: true
});

//crea un modelo con el nombre elegido y la coleccion donde se guardará
module.exports = model('UserTicket', UserTicketSchema, 'userTickets');

