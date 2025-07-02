import express from 'express';
import cors from 'cors';
import teacherRoutes from './routes/teacherRoutes';
import classRoutes from './routes/classRoutes';
import { sequelize } from './config/database';
import './models/Teacher';
import './models/Class';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const swaggerDocument = YAML.load(path.join('src', 'docs', 'swagger.yaml'));

const corsOptions = {
  origin: process.env.REACT_APP_API_URL,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self'; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data:; " +
    "font-src 'self'; " +
    `connect-src 'self' ${process.env.REACT_APP_API_URL};`
  );
  next();
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/teachers', teacherRoutes);
app.use('/api/classes', classRoutes);

app.use((err: any, req: any, res: any, next: any) => {
  const status = err.status || 500;
  res.status(status).json({ error: err.message });
});

const start = async () => {
  try {
    await sequelize.authenticate()
      .then(() => console.log("DB connected successfully!"))
      .catch(err => console.error("Unable to connect to DB:", err));

    await sequelize.sync({ alter: true });
    console.log('Database connected');

    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

start();
