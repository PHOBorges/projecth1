const mongoose = require('mongoose');
const vacinaSchema = new mongoose.Schema({

    nome : String,
    dataVacinacao : Date,
     cpf : String,
     dataSolicitacao : Date,
     dataPrevista : Date,
     nroDose : Number,
     flTomou : String,
     



});


module.exports = mongoose.model('Vacina',vacinaSchema);

