export interface TeacherAttributes {
  id: string;
  name: string;
  subject: string;
  email: string;
  contactNumber: string;
}

export interface TeacherCreationAttributes extends Omit<TeacherAttributes, 'id'> {}