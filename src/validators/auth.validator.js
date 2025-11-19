const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Nome é obrigatório",
    "string.min": "Nome deve ter no mínimo 3 caracteres",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Email inválido",
    "string.empty": "Email é obrigatório",
  }),

  password: Joi.string().min(6).required().messages({
    "string.min": "Senha deve ter no mínimo 6 caracteres",
    "string.empty": "Senha é obrigatória",
  }),

  role: Joi.string()
    .valid("paciente", "profissional", "admin")
    .default("paciente")
    .messages({
      "any.only": "Role inválida. Use paciente, profissional ou admin",
    })
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email inválido",
    "string.empty": "Email é obrigatório",
  }),

  password: Joi.string().min(6).required().messages({
    "string.min": "Senha deve ter no mínimo 6 caracteres",
    "string.empty": "Senha é obrigatória",
  })
});

module.exports = {
  registerSchema,
  loginSchema
};
