export interface TeacherAttributes {
    id: number;
    name: string;
    subject: string;
    email: string;
    contactNumber: string;
}

export interface TeacherCreationAttributes extends Omit<TeacherAttributes, 'id'> { }