const Task = require('../models/task.model');
const Joi = require('joi');

const taskSchema = Joi.object({
  titulo: Joi.string().required(),
  descricao: Joi.string().allow('', null),
  status: Joi.string().valid('pendente', 'em_andamento', 'concluida'),
  dataConclusao: Joi.date().iso()
});

exports.createTask = async (req, res, next) => {
  try {
    const { error, value } = taskSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }

    const newTask = await Task.create(value);
    return res.status(201).json({ success: true, data: newTask });
  } catch (err) {
    next(err);
  }
};

exports.getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find();
    if (!tasks.length) {
      return res.status(404).json({ success: false, message: 'Nenhuma tarefa encontrada.' });
    }
    return res.status(200).json({ success: true, total: tasks.length, data: tasks });
  } catch (err) {
    next(err);
  }
};

exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Tarefa não encontrada.' });
    }
    return res.status(200).json({ success: true, data: task });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(422).json({ success: false, message: 'ID inválido.' });
    }
    next(err);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const { error } = taskSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ success: false, message: 'Tarefa não encontrada.' });
    }

    return res.status(200).json({ success: true, data: task });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(422).json({ success: false, message: 'ID inválido.' });
    }
    next(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const removed = await Task.findByIdAndDelete(req.params.id);
    if (!removed) {
      return res.status(404).json({ success: false, message: 'Tarefa não encontrada.' });
    }
    return res.status(200).json({ success: true, message: 'Tarefa deletada com sucesso!' });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(422).json({ success: false, message: 'ID inválido.' });
    }
    next(err);
  }
};

