import express, { Router, Request, Response, NextFunction } from 'express';
import { Class } from '../models/Class';
import { Teacher } from '../models/Teacher';

const router: Router = express.Router();

// GET /classes
router.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const classes = await Class.findAll({
      attributes: ['level', 'name'],
      include: [
        {
          model: Teacher,
          as: 'formTeacher',
          attributes: ['name']
        }
      ]
    });

    res.status(200).json({ data: classes });
  } catch (err) {
    next(err);
  }
});

// POST /classes
router.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { level, name, teacherEmail } = req.body;

    // Validate required fields
    if (!level || !name || !teacherEmail) {
      res.status(400).json({ error: 'All fields (level, name, teacherEmail) are required.' });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(teacherEmail)) {
      res.status(400).json({ error: 'Invalid email format.' });
      return;
    }

    // Check teacher exists
    const teacher = await Teacher.findOne({ where: { email: teacherEmail } });
    if (!teacher) {
      res.status(400).json({ error: 'Teacher not found.' });
      return;
    }

    const newClass = await Class.create({
      level,
      name,
      formTeacherId: teacher.id
    });

    res.status(201).json({
      data: {
        level: newClass.level,
        name: newClass.name,
        formTeacher: { name: teacher.name }
      }
    });
  } catch (err: any) {
    if (err.name === 'SequelizeValidationError') {
      res.status(400).json({ error: err.errors?.[0]?.message || 'Validation error.' });
    } else {
      next(err);
    }
  }
});

export default router;
