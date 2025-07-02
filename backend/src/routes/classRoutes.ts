import express, { Router, Request, Response, NextFunction } from 'express';
import { Class } from '../models/Class';
import { Teacher } from '../models/Teacher';

const router: Router = express.Router();

// GET /classes
router.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log('[GET] /classes');

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

    console.log(`Fetched ${classes.length} classes`);
    res.status(200).json({ data: classes });
  } catch (err) {
    console.error('Error fetching classes:', err);
    next(err);
  }
});

// POST /classes
router.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log('[POST] /classes');
    console.log('Request body:', req.body);

    const { level, name, teacherEmail } = req.body;

    if (!level || !name || !teacherEmail) {
      console.warn('Missing required fields');
      res.status(400).json({ error: 'All fields (level, name, teacherEmail) are required.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(teacherEmail)) {
      console.warn('Invalid email format:', teacherEmail);
      res.status(400).json({ error: 'Invalid email format.' });
      return;
    }

    const teacher = await Teacher.findOne({ where: { email: teacherEmail } });
    if (!teacher) {
      console.warn('Teacher not found for email:', teacherEmail);
      res.status(400).json({ error: 'Teacher not found.' });
      return;
    }

    const existingClass = await Class.findOne({ where: { formTeacherId: teacher.id } });
    if (existingClass) {
      console.warn('Teacher is already assigned as a form teacher:', teacher.email);
      res.status(400).json({ error: 'This teacher is already assigned to a class.' });
      return;
    }

    const newClass = await Class.create({
      level,
      name,
      formTeacherId: teacher.id
    });

    console.log('New class created:', {
      id: newClass.id,
      level: newClass.level,
      name: newClass.name,
      formTeacherId: teacher.id,
    });

    res.status(201).json({
      data: {
        level: newClass.level,
        name: newClass.name,
        formTeacher: { name: teacher.name }
      }
    });
  } catch (err: any) {
    console.error('Error creating class:', err);

    if (err.name === 'SequelizeValidationError') {
      res.status(400).json({ error: err.errors?.[0]?.message || 'Validation error.' });
    } else {
      next(err);
    }
  }
});

export default router;
