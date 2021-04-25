const PacienteRep = require('../data/PacienteRep');

module.exports.BuscaPacientes = function () {
    return PacienteRep.BuscaPacientes();
}

module.exports.BuscaPacientesPorCPF = function (cpf) {
    return PacienteRep.BuscaPacientesPorCPF(cpf);
}

module.exports.InserePaciente = function (novoPaciente) {
  
    const PacienteRetorno = PacienteRep.BuscaPacientesPorCPF(novoPaciente.cpf);
    if (PacienteRetorno.length == 0) {
        return null;
    }
    return PacienteRep.InserePaciente(novoPaciente);
}

module.exports.atualizaPaciente = function (atualizaPaciente) {

    const PacienteRetorno = PacienteRep.BuscaPacientesPorCPF(atualizaPaciente.cpf);
    if (PacienteRetorno.length == 0) {
        return false;
    }
    const resultadoPaciente = PacienteRep.atualizaPaciente(atualizaPaciente);
    return true;
}


module.exports.RemoverPaciente = function (cpf) {

   
    const PacienteRetorno = PacienteRep.BuscaPacientesPorCPF(cpf);
    if (PacienteRetorno.length == 0) {
        return false;
    }
    const resultadoPaciente = PacienteRep.RemoverPaciente(cpf);
    return true;
}

module.exports.verificaEmailSenha = function (email, senha) {
    return PacienteRep.verificaEmailSenha(email, senha);
}

module.exports.BuscaPacientePorEmail = function (email) {
    return PacienteRep.BuscaPacientePorEmail(email);
}