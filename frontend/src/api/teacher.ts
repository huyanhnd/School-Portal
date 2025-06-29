import axios from './axios';

export const getTeachers = () => axios.get('/teachers');
export const createTeacher = (teacher: {
  name: string;
  subject: string;
  email: string;
  contactNumber: string;
}) => axios.post('/teachers', teacher);
