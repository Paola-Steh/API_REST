const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  titulo: { type: String, required: true, trim: true },
  descricao: { type: String, trim: true },
  status: { type: String, enum: ['pendente', 'em_andamento', 'concluida'], default: 'pendente' },
  dataCriacao: { type: Date, default: Date.now },
  dataConclusao: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);


