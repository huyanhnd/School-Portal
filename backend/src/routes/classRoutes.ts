import express, { Router, Request, Response, NextFunction } from 'express';
import { Class } from '../models/Class';
import { Teacher } from '../models/Teacher';

const router: Router = express.Router();

/**
 * @swagger
 * /api/classes:
 *   get:
 *     summary: Get list of classes
 *     responses:
 *       200:
 *         description: List of classes with form teacher name
 */
router.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const classes = await Class.findAll({
      include: [{ model: Teacher, attributes: ['name'], as: 'formTeacher' }]
    });
    res.status(200).json({ data: classes });
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /api/classes:
 *   post:
 *     summary: Create new class
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               level:
 *                 type: string
 *               name:
 *                 type: string
 *               teacherEmail:
 *                 type: string
 *     responses:
 *       201:
 *         description: Class created
 */
router.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { level, name, teacherEmail } = req.body;

    const teacher = await Teacher.findOne({ where: { email: teacherEmail } });
    if (!teacher) {
      res.status(400).json({ error: 'Teacher not found' });
      return;
    }

    const newClass = await Class.create({ level, name, teacherEmail });
    res.status(201).json(newClass);
  } catch (err) {
    next(err);
  }
});

export default router;
