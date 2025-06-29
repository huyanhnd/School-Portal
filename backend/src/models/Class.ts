import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export const Class = sequelize.define('Class', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  level: { type: DataTypes.STRING, allowNull: false },
  teacherEmail: { type: DataTypes.STRING, allowNull: false, unique: true },
});