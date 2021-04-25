const VacinaRep = require('../Data/VacinaRep');

module.exports.buscaSolicitacoesVacina = async function(){

  return VacinaRep.buscaSolicitacoesVacina();



}

module.exports.buscaSolicitacaoPorCpf =  function (cpf){


  return VacinaRep.buscaSolicitacaoPorCpf(cpf);



}

module.exports.inserePacienteParaVacina = async function (novaVacinacao){

const vacinaRetorno = VacinaRep.buscaSolicitacaoPorCpf(novaVacinacao.cpf);
  if (vacinaRetorno.length == 0) {
  
    return null;

  }
  
  return VacinaRep.inserePacienteParaVacina(novaVacinacao);
  
  
  
  }

  module.exports.atualizaVacinacao = async function (atualizaVacinacao){

const vacinaRetorno = await VacinaRep.buscaSolicitacaoPorCpf(atualizaVacinacao.cpf);
if (vacinaRetorno.length == 0){

  return false;

}

const resultadoVacina = await VacinaRep.atualizaVacinacao(atualizaVacinacao);

      return true;
}




  module.exports.removeVacinacao =  async function (cpf){

const vacinaRetorno = await VacinaRep.buscaSolicitacaoPorCpf(cpf);
if (vacinaRetorno.length == 0){

  return false;

}
  
const resultadoVacina = await VacinaRep.removeVacinacao(cpf);

return true;

  }
  
  module.exports.verificaEmailSenha = function (email, senha) {
    return VacinaRep.verificaEmailSenha(email, senha);
}

module.exports.buscaAlunoPorEmail = function (email) {
    return VacinaRep.buscaAlunoPorEmail(email);
}