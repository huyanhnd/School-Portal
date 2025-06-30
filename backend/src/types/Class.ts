export interface ClassAttributes {
    id: number;
    name: string;
    level: string;
    formTeacherId: number;
}

export interface ClassCreationAttributes extends Omit<ClassAttributes, 'id'> { }