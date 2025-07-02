"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Class = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const Teacher_1 = require("./Teacher");
class Class extends sequelize_1.Model {
}
exports.Class = Class;
Class.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    level: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    formTeacherId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        unique: true,
    },
}, {
    sequelize: database_1.sequelize,
    tableName: 'Classes',
    timestamps: false,
});
Class.belongsTo(Teacher_1.Teacher, {
    foreignKey: 'formTeacherId',
    as: 'formTeacher'
});
//# sourceMappingURL=Class.js.map