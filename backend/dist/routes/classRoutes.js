"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Class_1 = require("../models/Class");
const Teacher_1 = require("../models/Teacher");
const router = express_1.default.Router();
// GET /classes
router.get('/', async (req, res, next) => {
    try {
        console.log('[GET] /classes');
        const classes = await Class_1.Class.findAll({
            attributes: ['level', 'name'],
            include: [
                {
                    model: Teacher_1.Teacher,
                    as: 'formTeacher',
                    attributes: ['name']
                }
            ]
        });
        console.log(`Fetched ${classes.length} classes`);
        res.status(200).json({ data: classes });
    }
    catch (err) {
        console.error('Error fetching classes:', err);
        next(err);
    }
});
// POST /classes
router.post('/', async (req, res, next) => {
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
        const teacher = await Teacher_1.Teacher.findOne({ where: { email: teacherEmail } });
        if (!teacher) {
            console.warn('Teacher not found for email:', teacherEmail);
            res.status(400).json({ error: 'Teacher not found.' });
            return;
        }
        const newClass = await Class_1.Class.create({
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
    }
    catch (err) {
        console.error('Error creating class:', err);
        if (err.name === 'SequelizeValidationError') {
            res.status(400).json({ error: err.errors?.[0]?.message || 'Validation error.' });
        }
        else {
            next(err);
        }
    }
});
exports.default = router;
//# sourceMappingURL=classRoutes.js.map