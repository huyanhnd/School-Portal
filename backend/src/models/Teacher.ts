import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { TeacherAttributes, TeacherCreationAttributes } from '../types/Teacher';

export class Teacher extends Model<TeacherAttributes, TeacherCreationAttributes> implements TeacherAttributes {
  public id!: number;
  public name!: string;
  public subject!: string;
  public email!: string;
  public contactNumber!: string;
}

Teacher.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  subject: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  contactNumber: { type: DataTypes.STRING, allowNull: false }
}, {
  sequelize,
  tableName: 'Teachers',
  timestamps: false
});
