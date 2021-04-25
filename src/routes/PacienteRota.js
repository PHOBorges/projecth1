const { Router } = require('express');
const PacienteService = require('../service/PacienteService');
const autenticacaoJWT = require('../service/AuthService');
const { validate } = require('../validations/validations');
const { PacienteValidationRules } = require('../validations/PacienteValidacao');

const routes = Router();

routes.get('/', autenticacaoJWT.verificarToken, async (request, response) => {
    const retornoPaciente = await PacienteService.buscaPacientes();
    return response.json(retornoPaciente);
});

routes.get('/:cpf', autenticacaoJWT.verificarToken, async (request, response) => {
    const { cpf } = request.params;
    const retornoPaciente = await PacienteService.BuscaPacientesPorCPF(cpf);
    return response.json(retornoPaciente);
});

routes.post('/', PacienteValidationRules(), validate , async (request, response) => {



    const { nome, cpf, altura,  peso, imc , classificacao, dataNascimento, cidade, UF , listaComorbidades , JaTeveCovid, email, senha } = request.body;
    console.log(request.body);
   

    const novoPaciente = { nome, cpf, altura, peso , imc, classificacao, dataNascimento, cidade, UF , listaComorbidades , JaTeveCovid, email, senha};
    const pacienteRetorno = await PacienteService.InserePaciente(novoPaciente);
    if (pacienteRetorno === null){

        response.status(500).json({ "ERRO": "CPF do paciente já existe." });
    }
    return response.status(201).json({ pacienteRetorno });

    });

routes.put('/:cpf', autenticacaoJWT.verificarToken, async (request, response) => {
 
    const { cpf } = request.params;
    const { nome, email } = request.body;
    const PacienteAtualizado = { cpf, nome, email };

    const retornoPaciente = await PacienteService.AtualizacaoPaciente(PacienteAtualizado);
    if (!retornoPaciente)
        response.status(404).json({ "ERRO": "Paciente não encontrado" });

    return response.status(200).json({ "OK": "Paciente atualizado!" });
});

routes.delete('/:cpf', autenticacaoJWT.verificarToken, async (request, response) => {
    const { cpf } = request.params;

    const retornoPaciente = await PacienteService.removeAluno(cpf);
    if (!retornoPaciente)
        return response.status(404).json({ "ERRO": "Paciente não encontrado" });

    return response.json({ "Message": `Paciente ${cpf} removido!` });
});


module.exports = routes;