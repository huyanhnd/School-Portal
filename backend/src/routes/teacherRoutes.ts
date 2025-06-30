import express, { Router, Request, Response, NextFunction } from 'express';
import { Teacher } from '../models/Teacher';

const router: Router = express.Router();

// GET /teachers
router.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const teachers = await Teacher.findAll({
      attributes: ['name', 'subject', 'email', 'contactNumber']
    });
    res.status(200).json({ data: teachers });
  } catch (err) {
    next(err);
  }
});

// POST /teachers
router.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, subject, email, contactNumber } = req.body;

    // Basic validation
    if (!name || !subject || !email || !contactNumber) {
      res.status(400).json({ error: 'All fields (name, subject, email, contactNumber) are required.' });
      return;
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ error: 'Invalid email format.' });
      return;
    }

    // Check if email already exists
    const existingTeacher = await Teacher.findOne({ where: { email } });
    if (existingTeacher) {
      res.status(400).json({ error: 'Email already exists.' });
      return;
    }

    const newTeacher = await Teacher.create({ name, subject, email, contactNumber });
    res.status(201).json({ data: newTeacher });
  } catch (err: any) {
    // If Sequelize throws a validation error
    if (err.name === 'SequelizeValidationError') {
      res.status(400).json({ error: err.errors?.[0]?.message || 'Validation error.' });
    } else {
      next(err);
    }
  }
});

export default router;
