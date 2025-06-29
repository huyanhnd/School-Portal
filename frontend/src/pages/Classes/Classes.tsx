import { useEffect, useState } from 'react';
import { Table, Button, Typography } from 'antd';
import axios from 'axios';

const { Title } = Typography;

const Classes = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/classes').then(res => setClasses(res.data.data));
  }, []);

  const columns = [
    { title: 'Level', dataIndex: 'level' },
    { title: 'Name', dataIndex: 'name' },
    { title: 'Form Teacher', dataIndex: ['formTeacher', 'name'] },
  ];

  return (
    <div style={{ padding: 36 }}>
      <Title level={3}>Classes</Title>
      <Button type="primary" href="/add-class" style={{ marginBottom: 16 }}>
        + Add Class
      </Button>
      <Table columns={columns} dataSource={classes} rowKey={(r: any) => r.name} bordered />
    </div>
  );
};

export default Classes;