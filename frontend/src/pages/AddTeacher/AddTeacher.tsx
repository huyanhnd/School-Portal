import { Form, Input, Button, Select, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axiosInstance';
import styles from './AddTeacher.module.css';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

const AddTeacher = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    try {
      const res = await axios.post('/teachers', values);
      message.success('Teacher added successfully!');
      navigate('/'); // redirect to teacher list
    } catch (err) {
      console.error(err);
      message.error('Failed to add teacher. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <Title level={3} className={styles.title}>Add Teacher</Title>

      <div className={styles.card}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark={false}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter name' }]}
          >
            <Input placeholder="Name" className={styles.input} />
          </Form.Item>

          <Form.Item
            label="Subject"
            name="subject"
            rules={[{ required: true, message: 'Please select a subject' }]}
          >
            <Select placeholder="Select a subject" className={styles.input}>
              <Option value="Math">Math</Option>
              <Option value="Science">Science</Option>
              <Option value="English">English Language</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Email Address"
            name="email"
            rules={[
              { required: true, message: 'Please enter email address' },
              { type: 'email', message: 'This email address is invalid.' },
            ]}
          >
            <Input placeholder="Email address" className={styles.input} />
          </Form.Item>

          <Form.Item
            label="Work Contact Number"
            name="contactNumber"
            rules={[
              { required: true, message: 'Please enter contact number' },
              {
                pattern: /^\d{8}$/,
                message: 'This work contact number is invalid.',
              },
            ]}
          >
            <Input placeholder="Work contact number" className={styles.input} />
          </Form.Item>
        </Form>
      </div>

      <div className={styles.footerActions}>
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/')} className={styles.backButton}>
          Back
        </Button>
        <Button type="primary" onClick={() => form.submit()} className={styles.submitButton}>
          Add Teacher
        </Button>
      </div>
    </div>
  );
};

export default AddTeacher;
