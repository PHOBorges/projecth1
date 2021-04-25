const { Router, request } = require('express');
const vacinaServico = require('../service/VacinaService');
const autenticacaoJWT = require('../service/AuthService');
const { validate } = require('../validations/validations');
const { VacinaValidationRules } = require('../validations/VacinaValidacao');


const routes2 = Router();

routes2.get('/', autenticacaoJWT.verificarToken, async (request, response) => {
    const vacinaRetorno = await VacinaService.buscaSolicitacoesVacina();
    return response.json(vacinaRetorno);
});

routes2.get('/:cpf', autenticacaoJWT.verificarToken, async (request, response) => {
    const { cpf } = request.params;
    const vacinaRetorno = await VacinaService.buscaSolicitacaoPorCpf(cpf);
    return response.json(vacinaRetorno);
});


    routes2.post('/', VacinaValidationRules() ,  validate, async (request, response) => {

    
    
        const { nome, dataSolicitacao, dataPrevista, nroDose, flTomou, dataVacinacao,cpf } = request.body;
        console.log(request.body);
        
        
        const novaVacinacao = {  nome, dataSolicitacao, dataPrevista, nroDose, flTomou, dataVacinacao, cpf};
        const vacinaRetorno = await VacinaService.inserePacienteParaVacina(novaVacinacao);
        if (vacinaRetorno === null){

            response.status(500).json({ "ERRO": "Paciente não inserido!" });
        }
        return response.status(201).json({ vacinaRetorno });
    
        });


        routes2.put('/vacina/:cpf', async (request, response) => {
            //route params guid
        
            const { cpf} = request.params;
            const { nome, dataSolicitacao, dataPrevista, nroDose, flTomou, dataVacinacao} = request.body;
            const vacinacaoAtualizar = {nome, dataSolicitacao, dataPrevista, nroDose, flTomou, dataVacinacao, cpf};
            const vacinaRetorno = await VacinaService.atualizaVacinacao(vacinacaoAtualizar);      
            if (!vacinaRetorno)
        return response.status(404).json({ "ERRO": "Paciente não encontado!" });

    return response.status(200).json({ "ok": "Paciente Atualizado!" });    
                
               
        
        });
        
       
        
        routes2.delete('/:cpf', autenticacaoJWT.verificarToken, async (request, response) => {
           
            const { cpf } = request.params;
           console.log(cpf); 
            const vacinaRetorno = await VacinaService.removeVacinacao(cpf);
            if (!vacinaRetorno) 
            return response.status(404).json({ "ERRO": "Paciente não encontrado!!" });
        
                
                return response.status(200).json({ "Message": `Pessoa ${cpf} removida da fila de Vacinação!!!` });
        });

        module.exports = routes2;