const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const yaml = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const authRoutes = require('./routes/auth.routes');
const appointmentRoutes = require('./routes/appointment.routes');
const taskRoutes = require('./routes/task.routes');
const errorHandler = require('./middlewares/error.middleware');

const swaggerDoc = yaml.load(path.join(__dirname, 'docs', 'swagger.yaml'));

const app = express();

app.use(morgan('dev'));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
}));
app.use(express.json({ limit: '10mb' }));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/appointments', appointmentRoutes);
app.use('/api/v1/tarefas', taskRoutes);

app.get('/api/v1/health', (req, res) => res.status(200).json({ status: 'OK' }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(errorHandler);

module.exports = app;
