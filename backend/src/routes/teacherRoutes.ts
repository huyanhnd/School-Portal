import express, { Router, Request, Response, NextFunction } from 'express';
import { Teacher } from '../models/Teacher';

const router: Router = express.Router();

// GET /teachers
router.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log('[GET] /teachers');

    const teachers = await Teacher.findAll({
      attributes: ['name', 'subject', 'email', 'contactNumber']
    });

    console.log(`Fetched ${teachers.length} teachers`);
    res.status(200).json({ data: teachers });
  } catch (err) {
    console.error('Error fetching teachers:', err);
    next(err);
  }
});

// POST /teachers
router.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log('[POST] /teachers');
    console.log('Request body:', req.body);

    const { name, subject, email, contactNumber } = req.body;

    if (!name || !subject || !email || !contactNumber) {
      console.warn('Missing required fields');
      res.status(400).json({ error: 'All fields (name, subject, email, contactNumber) are required.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.warn('Invalid email format:', email);
      res.status(400).json({ error: 'Invalid email format.' });
      return;
    }

    const existingTeacher = await Teacher.findOne({ where: { email } });
    if (existingTeacher) {
      console.warn('Email already exists:', email);
      res.status(400).json({ error: 'Email already exists.' });
      return;
    }

    const newTeacher = await Teacher.create({ name, subject, email, contactNumber });
    console.log('New teacher created:', newTeacher.id);

    res.status(201).json({ data: newTeacher });
  } catch (err: any) {
    console.error('Error in POST /teachers:', err);

    if (err.name === 'SequelizeValidationError') {
      res.status(400).json({ error: err.errors?.[0]?.message || 'Validation error.' });
    } else {
      next(err);
    }
  }
});

export default router;
