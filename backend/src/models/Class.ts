import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { ClassAttributes, ClassCreationAttributes } from '../types/Class';
import { Teacher } from './Teacher';

export class Class extends Model<ClassAttributes, ClassCreationAttributes> implements ClassAttributes {
  public id!: number;
  public name!: string;
  public level!: string;
  public formTeacherId!: number;
}

Class.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  level: { type: DataTypes.STRING, allowNull: false },
  formTeacherId: { type: DataTypes.INTEGER, allowNull: false }
}, {
  sequelize,
  tableName: 'Classes',
  timestamps: false
});

Class.belongsTo(Teacher, {
  foreignKey: 'formTeacherId',
  as: 'formTeacher'
});