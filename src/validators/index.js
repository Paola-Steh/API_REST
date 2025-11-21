const Joi = require('joi');

const appointmentCreate = Joi.object({
  paciente: Joi.string().required(),
  profissional: Joi.string().required(),
  start: Joi.date().iso().required(),
  end: Joi.date().iso().required(),
  reason: Joi.string().allow('', null)
});

const appointmentUpdate = Joi.object({
  start: Joi.date().iso(),
  end: Joi.date().iso(),
  reason: Joi.string().allow('', null),
  status: Joi.string().valid('scheduled','completed','cancelled')
});

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('paciente','profissional','admin')
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

module.exports = {
  appointmentCreate,
  appointmentUpdate,
  registerSchema,
  loginSchema
};
