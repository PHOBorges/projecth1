const VacinaRep = require('../models/Vacina');


module.exports.buscaSolicitacoesVacina = async function () {


return await VacinaRep.find();

}

module.exports.buscaPacientePorCpf = async function (cpf){

return await VacinaRep.find({ cpf });

}

module.exports.buscaSolicitacaoPorCpf = async function (cpf){

    return await VacinaRep.findOne({ cpf });
    
    }

module.exports.inserePacienteParaVacina = async function (novaVacinacao){
const {nome, dataSolicitacao, dataPrevista, nroDose, flTomou, dataVacinacao, cpf} = novaVacinacao;

const retornoVacina = await VacinaRep.create({
    nome, dataSolicitacao, dataPrevista, nroDose, flTomou, dataVacinacao,cpf


});

return retornoVacina;

}



module.exports.atualizaVacinacao = async function (atualizaVacinacao){


    const {nome, dataSolicitacao, dataPrevista, nroDose, flTomou, dataVacinacao, cpf} = atualizaVacinacao;
    
    const vacinaAtualizada = await VacinaRep.updateOne(
        
        { cpf }, 
        {
            $set:
            {
                 nome
            }
        }
        
        );

            return vacinaAtualizada;

}

module.exports.removeVacinacao = async function (cpf) {


    return VacinaRep.deleteOne({ cpf });


}

module.exports.verificaEmailSenha = async function (email, senha) {
    return await VacinaRep.findOne({ email, senha });
}