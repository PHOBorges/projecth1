
const express = require('express');
const cors = require('cors');

const routes = require('./routes/PacienteRota');
const routes2 = require('./routes/VacinaRota');
const Authroutes = require('./routes/authRota');
const connectDB = require('./infra/database');



const bd = () => new Promise((resolve, reject) => {
    resolve(connectDB());
});


bd()
    .then(resp => {
        console.log(`Sucesso: Banco de dados`);

        const app = express();

        app.use(express.json());
        app.use(cors());
        app.use('/auth', Authroutes);
        app.use('/paciente', routes);
        app.use('/vacina', routes2);

        module.exports = app.listen(process.env.PORT || 3333, () => {
            console.log("Server running");
        });




    })
    .catch(err => console.log(err));

