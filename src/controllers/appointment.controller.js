const Appointment = require('../models/appointment.model');
const User = require('../models/user.model');
const { appointmentCreate, appointmentUpdate } = require('../validators');

async function hasOverlap(profissionalId, start, end, excludeId = null) {
  const q = {
    profissional: profissionalId,
    $or: [
      { start: { $lt: end }, end: { $gt: start } }
    ]
  };
  if (excludeId) q._id = { $ne: excludeId };
  const conflicting = await Appointment.findOne(q);
  return !!conflicting;
}

exports.create = async (req, res, next) => {
  try {
    const { error, value } = appointmentCreate.validate(req.body);
    if (error) return res.status(400).json({ success:false, message: error.message });

    const paciente = await User.findById(value.paciente);
    if (!paciente) return res.status(404).json({ success:false, message: 'Paciente not found' });
    const profissional = await User.findById(value.profissional);
    if (!profissional) return res.status(404).json({ success:false, message: 'Profissional not found' });

    const start = new Date(value.start);
    const end = new Date(value.end);

    if (end <= start) return res.status(400).json({ success:false, message: 'end must be after start' });

    const overlap = await hasOverlap(value.profissional, start, end);
    if (overlap) return res.status(422).json({ success:false, message: 'profissional has another appointment in this period' });

    const appt = new Appointment({ ...value });
    await appt.save();
    const saved = await appt.populate('paciente', 'name email').populate('profissional', 'name email').execPopulate();
    res.status(201).json({ success:true, data: saved });
  } catch (err) {
    next(err);
  }
};

exports.list = async (req, res, next) => {
  try {
    const { profissional, paciente, status, from, to } = req.query;
    const q = {};
    if (profissional) q.profissional = profissional;
    if (paciente) q.paciente = paciente;
    if (status) q.status = status;
    if (from || to) q.start = {};
    if (from) q.start.$gte = new Date(from);
    if (to) q.start.$lte = new Date(to);

    const items = await Appointment.find(q).populate('paciente','name email').populate('profissional','name email').sort({ start: 1 });
    res.json({ success:true, data: items });
  } catch (err) {
    next(err);
  }
};

exports.get = async (req, res, next) => {
  try {
    const appt = await Appointment.findById(req.params.id).populate('paciente','name email').populate('profissional','name email');
    if (!appt) return res.status(404).json({ success:false, message: 'Appointment not found' });
    res.json({ success:true, data: appt });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { error, value } = appointmentUpdate.validate(req.body);
    if (error) return res.status(400).json({ success:false, message: error.message });

    const appt = await Appointment.findById(req.params.id);
    if (!appt) return res.status(404).json({ success:false, message: 'Appointment not found' });

    const newStart = value.start ? new Date(value.start) : appt.start;
    const newEnd = value.end ? new Date(value.end) : appt.end;
    const profissionalId = value.profissional || appt.profissional;

    if (newEnd <= newStart) return res.status(400).json({ success:false, message: 'end must be after start' });

    const overlap = await hasOverlap(profissionalId, newStart, newEnd, appt._id);
    if (overlap) return res.status(422).json({ success:false, message: 'profissional has another appointment in this period' });

    Object.assign(appt, value);
    await appt.save();
    const updated = await Appointment.findById(appt._id).populate('paciente','name email').populate('profissional','name email');
    res.json({ success:true, data: updated });
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const appt = await Appointment.findById(req.params.id);
    if (!appt) return res.status(404).json({ success:false, message: 'Appointment not found' });
    await Appointment.findByIdAndDelete(appt._id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
