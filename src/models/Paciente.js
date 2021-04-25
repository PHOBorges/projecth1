const mongoose = require('mongoose');
const pacienteSchema = new mongoose.Schema({

    JaTeveCovid : String,
    peso : Number,
    cpf : String,
    altura : Number,
    imc : Number,
    nome : String,
    classificacao : String,
    dataNascimento : Date,
    cidade : String,
    email : String,
    senha : String,
    listaComorbidades : String,
    UF : String,
    
    


});


module.exports = mongoose.model('Paciente',pacienteSchema);

