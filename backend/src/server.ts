import express from 'express';
import cors from 'cors';
import path from 'path';
import teacherRoutes from './routes/teacherRoutes';
import classRoutes from './routes/classRoutes';
import { sequelize } from './config/database';
import './models/Teacher';
import './models/Class';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const app = express();

// Load Swagger YAML file
const swaggerDocument = YAML.load(path.join(process.cwd(), 'src', 'docs', 'swagger.yaml'));

// Middlewares
app.use(cors());
app.use(express.json());

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API routes
app.use('/api/teachers', teacherRoutes);
app.use('/api/classes', classRoutes);

// Serve static frontend
const publicPath = path.join(process.cwd(), 'public');
app.use(express.static(publicPath));

// Handle SPA (for React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// Error handling
app.use((err: any, req: any, res: any, next: any) => {
  const status = err.status || 500;
  res.status(status).json({ error: err.message });
});

// Start server
const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connected successfully!');

    await sequelize.sync({ alter: true });
    console.log('Database synced');

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

start();
