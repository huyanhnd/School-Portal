import { useEffect, useState } from 'react';
import { Table, Button, Typography, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from '../../utils/axiosInstance';
import styles from './Teachers.module.css';

const { Title } = Typography;

interface Teacher {
  name: string;
  subject: string;
  email: string;
  contactNumber: string;
}

const Teachers = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/teachers')
      .then(res => setTeachers(res.data.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    { title: '#', dataIndex: 'key' },
    { title: 'Name', dataIndex: 'name' },
    { title: 'Subject', dataIndex: 'subject' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Work Contact', dataIndex: 'contactNumber' },
  ];

  const data = teachers.map((t, i) => ({
    key: i + 1,
    name: t.name,
    subject: t.subject,
    email: t.email,
    contactNumber: t.contactNumber,
  }));

  if (loading) {
    return <Spin className={styles.loading} />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <Title level={3} className={styles.title}>Teachers</Title>
        <Button
          type="primary"
          href="/add-teacher"
          className={styles.addButton}
          icon={<PlusOutlined />}
        >
          Add Teacher
        </Button>
      </div>

      <div className={styles.card}>
        {teachers.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyText}>There are no existing teachers yet.</p>
          </div>
        ) : (
          <Table columns={columns} dataSource={data} pagination={false} bordered />
        )}
      </div>
    </div>
  );
};

export default Teachers;
