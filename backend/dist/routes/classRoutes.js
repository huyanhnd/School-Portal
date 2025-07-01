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
        res.status(200).json({ data: classes });
    }
    catch (err) {
        next(err);
    }
});
// POST /classes
router.post('/', async (req, res, next) => {
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
        const teacher = await Teacher_1.Teacher.findOne({ where: { email: teacherEmail } });
        if (!teacher) {
            res.status(400).json({ error: 'Teacher not found.' });
            return;
        }
        const newClass = await Class_1.Class.create({
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
    }
    catch (err) {
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