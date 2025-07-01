import axios from '../utils/axiosInstance';

export const getAllClasses = () => {
    return axios.get('/classes');
};

export const addClass = (data: any) => {
    return axios.post('/classes', data);
};