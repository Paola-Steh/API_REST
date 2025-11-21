const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');
const authenticateToken = require('../middlewares/auth.middleware');

router.get('/', authenticateToken(), taskController.getAllTasks);
router.get('/:id', authenticateToken(), taskController.getTaskById);
router.post('/', authenticateToken(), taskController.createTask);
router.put('/:id', authenticateToken(), taskController.updateTask);
router.delete('/:id', authenticateToken(), taskController.deleteTask);

module.exports = router;
