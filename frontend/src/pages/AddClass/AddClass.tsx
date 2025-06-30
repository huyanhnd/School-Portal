import { useEffect, useState } from 'react';
import { Typography } from 'antd';
import AddPage, { FormField } from '../../components/AddPage/AddPage';
import axios from '../../utils/axiosInstance';
import useClearErrorOnRouteChange from '../../hooks/useClearErrorOnRouteChange';

const AddClass = () => {
  useClearErrorOnRouteChange();

  const [teacherOptions, setTeacherOptions] = useState<{ label: string; value: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/teachers')
      .then((res) => {
        const options = res.data.data.map((teacher: any) => ({
          label: teacher.name,
          value: teacher.email,
        }));
        setTeacherOptions(options);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const fields: FormField[] = [
    {
      label: 'Class Level',
      name: 'level',
      type: 'select',
      placeholder: 'Select a level',
      rules: [{ required: true, message: 'Please select class level' }],
      options: [
        'Primary 1', 'Primary 2', 'Primary 3',
        'Primary 4', 'Primary 5', 'Primary 6',
      ].map((level) => ({ label: level, value: level })),
    },
    {
      label: 'Class Name',
      name: 'name',
      type: 'input',
      placeholder: 'Class name',
      rules: [{ required: true, message: 'Please enter class name' }],
    },
    {
      label: 'Form Teacher',
      name: 'teacherEmail',
      type: 'select',
      placeholder: 'Assign a form teacher',
      rules: [{ required: true, message: 'Please select a form teacher' }],
      options: teacherOptions.length > 0
        ? teacherOptions
        : [{
          label: (
            <Typography.Text type="secondary">
              No existing teachers. <a href="/add-teacher">Add a teacher</a>
            </Typography.Text>
          ),
          value: '',
        }],
    },
  ];

  const handleSubmit = async (values: any): Promise<void> => {
    await axios.post('/classes', values);
  };

  return (
    <AddPage
      title="Class"
      fields={fields}
      onSubmit={handleSubmit}
      backLink="/classes"
      submitLabel="Add Class"
    />
  );
};

export default AddClass;
