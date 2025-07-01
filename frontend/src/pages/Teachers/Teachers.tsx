import { useEffect, useState } from 'react';
import ListPage from '../../components/ListPage/ListPage';
import useClearErrorOnRouteChange from '../../hooks/useClearErrorOnRouteChange';
import { getAllTeachers } from '../../api/teacher';
import { message } from 'antd';
import DOMPurify from 'dompurify';

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
    const fetchTeachers = async () => {
      try {
        const res = await getAllTeachers();
        setTeachers(res.data.data);
      } catch (err: any) {
        const errorMsg =
          err.response?.data?.error || 'Failed to load teachers.';
        const safeError = DOMPurify.sanitize(errorMsg);
        message.error(safeError);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
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
