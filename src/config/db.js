const mongoose = require('mongoose');

async function connect(uri) {
  try {
    await mongoose.connect(uri, {
      dbName: process.env.DB_NAME || undefined
    });

    console.log('📦 MongoDB conectado com sucesso!');
  } catch (err) {
    console.error('❌ Erro ao conectar ao MongoDB:', err.message);
    throw err;
  }
}

module.exports = { connect };