
const PacienteRep = require('../models/Paciente');


module.exports.BuscaPacientes = async function () {
    return await PacienteRep.find();
}

module.exports.BuscaPacientesPorCPF = async function (cpf) {
    return await PacienteRep.findOne({ cpf });
}

module.exports.BuscaPacientePorEmail = async function (email) {
    return await PacienteRep.findOne({ email });
}

module.exports.InserePaciente = async function (novoPaciente) {
    const { nome, cpf, email, senha, peso, altura, imc, classificacao,dataNascimento, cidade, UF, listaComorbidades, JaTeveCovid} = novoPaciente;
    const retornoPaciente = await PacienteRep.create({
        nome, cpf, email, senha, peso, altura, imc, classificacao,dataNascimento, cidade, UF, listaComorbidades, JaTeveCovid
    });
    console.log('inserido..');
    console.log(retornoPaciente);
    return retornoAluno;
}

module.exports.AtualizacaoPaciente = async function (atualizaPaciente) {
    const { nome, cpf, email, senha, peso, altura, imc, classificacao,dataNascimento, cidade, UF, listaComorbidades, JaTeveCovid } = atualizaPaciente;
    const PacienteAtualizado = await PacienteRep.updateOne(
        { nome, cpf, email, senha, peso, altura, imc, classificacao,dataNascimento, cidade, UF, listaComorbidades, JaTeveCovid },
        {
            $set:
            {
                email, nome
            }
        }
    );
    return PacienteAtualizado;
}

module.exports.RemoverPaciente = async function (cpf) {
    return await PacienteRep.deleteOne({ cpf });
}

module.exports.verificaEmailSenha = async function (email, senha) {
    return await PacienteRep.findOne({ email, senha });
}