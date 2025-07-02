import AddPage, { FormField } from '../../components/AddPage/AddPage';
import axios from '../../utils/axiosInstance';
import useClearErrorOnRouteChange from '../../hooks/useClearErrorOnRouteChange';
import { addTeacher } from '../../api/teacher';

const fields: FormField[] = [
  {
    label: 'Name',
    name: 'name',
    type: 'input',
    placeholder: 'Name',
    rules: [{ required: true, message: 'Please enter name' }],
  },
  {
    label: 'Subject',
    name: 'subject',
    type: 'select',
    placeholder: 'Select a subject',
    rules: [{ required: true, message: 'Please select subject' }],
    options: [
      'English Language',
      'Mother Tongue Language',
      'Mathematics',
      'Science',
      'Art',
      'Music',
      'Physical Education',
      'Social Studies',
      'Character and Citizenship Education',
    ].map((subject) => ({ label: subject, value: subject })),
  },
  {
    label: 'Email Address',
    name: 'email',
    type: 'input',
    inputType: 'email',
    placeholder: 'Email address',
    rules: [
      { required: true, message: 'Please enter email address' },
      { type: 'email', message: 'This email address is invalid.' },
    ],
  },
  {
    label: 'Work Contact Number',
    name: 'contactNumber',
    type: 'input',
    placeholder: 'Work contact number',
    rules: [
      { required: true, message: 'Please enter contact number' },
      { pattern: /^\d{8}$/, message: 'This work contact number is invalid.' },
    ],
  },
];

const AddTeacher = () => {
  useClearErrorOnRouteChange();

  const handleSubmit = async (values: any): Promise<void> => {
    await addTeacher(values);
  };

  return (
    <AddPage
      title="Teacher"
      fields={fields}
      onSubmit={handleSubmit}
      backLink="/"
      submitLabel="Add Teacher"
    />
  );
};

export default AddTeacher;
