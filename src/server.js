require('dotenv').config();
const app = require('./app');
const { connect } = require('./config/db');

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await connect(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Servidor rodando em: http://localhost:${PORT}/api-docs`);
    });
  } catch (err) {
    console.error('❌ Falha ao iniciar servidor:', err);
    process.exit(1);
  }
})();