const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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