const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointment.controller');
const authenticateToken = require('../middlewares/auth.middleware');

router.get('/', authenticateToken(), appointmentController.list);
router.get('/:id', authenticateToken(), appointmentController.get);
router.post('/', authenticateToken(), appointmentController.create);
router.put('/:id', authenticateToken(), appointmentController.update);
router.delete('/:id', authenticateToken(), appointmentController.remove);

module.exports = router;
