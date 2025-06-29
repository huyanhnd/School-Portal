import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export const Teacher = sequelize.define('Teacher', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  subject: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  contactNumber: { type: DataTypes.STRING, allowNull: false },
});