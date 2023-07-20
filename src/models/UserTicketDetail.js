//Autores: Vasquez Miguel, Alexandra Ivana & Barandiaran Japaja, Jhossepy Alexander & Marquez Mendez, Andrea Janet.

//importa el schema y modelo de moongose
const {Schema, model, SchemaTypes} = require('mongoose');

//Crea un schema para mongodb
const UserTicketDetailSchema = new Schema({
    amount: {
        type: Number,
        required: true
    },
    user_ticket_id:  {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "UserTicket"
    },
    description: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

//crea un modelo con el nombre elegido y la coleccion donde se guardará
module.exports = model('UserTicketDetail', UserTicketDetailSchema, 'userTicketDetails');

