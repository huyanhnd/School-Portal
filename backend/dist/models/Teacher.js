"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Teacher = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Teacher extends sequelize_1.Model {
}
exports.Teacher = Teacher;
Teacher.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    subject: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    email: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
    contactNumber: { type: sequelize_1.DataTypes.STRING, allowNull: false },
}, {
    sequelize: database_1.sequelize,
    tableName: 'Teachers',
    timestamps: false,
});
//# sourceMappingURL=Teacher.js.map