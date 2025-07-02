export interface ClassAttributes {
  id: string;
  name: string;
  level: string;
  formTeacherId: string;
}

export interface ClassCreationAttributes extends Omit<ClassAttributes, 'id'> {}
