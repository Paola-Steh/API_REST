const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  paciente: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  profissional: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  reason: { type: String },
  status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' }
}, { timestamps: true });

appointmentSchema.pre('save', function(next) {
  if (this.end <= this.start) {
    return next(new Error('end must be after start'));
  }
  next();
});

module.exports = mongoose.model('Appointment', appointmentSchema);
