import { Form, Input, Button, Select, message, Typography } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { Option } = Select;

const AddClass = () => {
  const [form] = Form.useForm();
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/api/teachers').then(res => {
      setTeachers(res.data.data);
    });
  }, []);

  const onFinish = (values: any) => {
    axios.post('http://localhost:3001/api/classes', values)
      .then(() => {
        message.success('Class added successfully');
        navigate('/classes');
      })
      .catch((err) => {
        message.error(err.response?.data?.error || 'Failed to add class');
      });
  };

  return (
    <div style={{ padding: 36, maxWidth: 480 }}>
      <Title level={3}>Add Class</Title>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item name="level" label="Class Level" rules={[{ required: true }]}> <Input placeholder="e.g. Primary 1" /> </Form.Item>
        <Form.Item name="name" label="Class Name" rules={[{ required: true }]}> <Input placeholder="e.g. Class 1A" /> </Form.Item>
        <Form.Item name="teacherEmail" label="Form Teacher" rules={[{ required: true }]}> 
          <Select placeholder="Select a teacher">
            {teachers.map((t: any) => (
              <Option key={t.email} value={t.email}>{t.name} ({t.email})</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddClass;