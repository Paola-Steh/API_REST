const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando!' });
});

module.exports = app;
