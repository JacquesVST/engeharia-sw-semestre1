const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
require('./controllers/clienteController')(app);
require('./controllers/fabricanteController')(app);
require('./controllers/aparelhoController')(app);
require('./controllers/aparelhoClienteController')(app);
require('./controllers/historicoSituacaoController')(app);
require('./controllers/pecaController')(app);
require('./controllers/problemaController')(app);
require('./controllers/produtoController')(app);
require('./controllers/servicoController')(app);
require('./controllers/vendaController')(app);

app.listen(3000);