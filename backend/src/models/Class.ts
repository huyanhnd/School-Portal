import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { ClassAttributes, ClassCreationAttributes } from '../types/Class';
import { Teacher } from './Teacher';

export class Class extends Model<ClassAttributes, ClassCreationAttributes> implements ClassAttributes {
  public id!: string;
  public name!: string;
  public level!: string;
  public formTeacherId!: string;
}

Class.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  level: { type: DataTypes.STRING, allowNull: false },
  formTeacherId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
  },
}, {
  sequelize,
  tableName: 'Classes',
  timestamps: false,
});

Class.belongsTo(Teacher, {
  foreignKey: 'formTeacherId',
  as: 'formTeacher'
});
