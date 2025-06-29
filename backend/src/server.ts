import express from 'express';
import cors from 'cors';
import teacherRoutes from './routes/teacherRoutes';
import classRoutes from './routes/classRoutes';
import { sequelize } from './config/database';
import './models/Teacher';
import './models/Class';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/teachers', teacherRoutes);
app.use('/api/classes', classRoutes);

app.use((err: any, req: any, res: any, next: any) => {
  const status = err.status || 500;
  res.status(status).json({ error: err.message });
});

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Database connected');
    app.listen(3001, () => {
      console.log('Server running on port 3001');
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

start();