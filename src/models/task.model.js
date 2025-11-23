const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  titulo: { type: String, required: true, trim: true },
  descricao: { type: String, trim: true },
  status: { type: String, enum: ['pendente', 'em_andamento', 'concluida'], default: 'pendente' },
  dataCriacao: { type: Date, default: Date.now },
  dataConclusao: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);


user.model
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6, select: false },
  role: { type: String, enum: ['admin', 'paciente', 'profissional'], default: 'paciente' }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function(candidate) {
  return bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model('User', userSchema);
