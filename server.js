require('dotenv').config();
const app = require('./src/app');
const { connect } = require('./src/config/db');

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await connect(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Falha ao iniciar servidor:', err);
    process.exit(1);
  }
})();