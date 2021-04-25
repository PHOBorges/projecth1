const jwt = require('jsonwebtoken');
const PacienteService = require('../service/PacienteService');

module.exports.verificarToken = async (request, response, next) => {
    const token = request.header('Authorization').split(' ');

    try {
        if (token == undefined)
            throw new Error();
        console.log('token ' + token[1]);
        const data = jwt.verify(token[1], process.env.JWT_KEY);

        const paciente = await PacienteService.BuscaPacientePorEmail(data.email);
        if (!paciente) {
            throw new Error();
        }
        request.user = paciente;
        request.token = token;
        next();
    }
    catch (error) {
        response.status(401).send({ 'error': 'Not Authorized' })
    }

}

module.exports.gerarToken = async (email, senha) => {
    const paciente = await AlunoService.verificaEmailSenha(email, senha);
    if (paciente == null) {
        return ({ auth: false, token: null, message: "Error: Login or password wrong!" });;
    }
    const token = jwt.sign({ email: paciente.email }, process.env.JWT_KEY);
    return ({ auth: true, token: token, message: "OK" });
}

