import { useEffect, useState } from 'react';
import axios from '../../utils/axiosInstance';
import ListPage from '../../components/ListPage/ListPage';
import useClearErrorOnRouteChange from '../../hooks/useClearErrorOnRouteChange';

interface Teacher {
  name: string;
  subject: string;
  email: string;
  contactNumber: string;
}

const Teachers = () => {
  useClearErrorOnRouteChange();

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/teachers')
      .then(res => setTeachers(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const formatPhone = (phone: string): string =>
    phone ? phone.replace(/(\d{4})(\d{4})/, '$1 $2') : '-';

  const columns = [
    { title: '#', dataIndex: 'key' },
    { title: 'Name', dataIndex: 'name' },
    { title: 'Subject', dataIndex: 'subject' },
    { title: 'Email', dataIndex: 'email' },
    {
      title: 'Work Contact',
      dataIndex: 'contactNumber',
      render: formatPhone,
    },
  ];

  const data = teachers.map((t, i) => ({
    key: i + 1,
    ...t,
  }));

  return (
    <ListPage
      title="Teachers"
      model="Teacher"
      data={data}
      columns={columns}
      loading={loading}
      addLink="/add-teacher"
      emptyMessage="There are no existing teachers yet."
    />
  );
};

export default Teachers;
