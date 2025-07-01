import axios from '../utils/axiosInstance';

export const getAllTeachers = () => {
  return axios.get('/teachers');
};

export const addTeacher = (data: any) => {
  return axios.post('/teachers', data);
};
