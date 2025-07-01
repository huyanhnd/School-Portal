import { Form, Input, Select, Button, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styles from './AddPage.module.css';
import { ReactNode } from 'react';
import { useError } from '../../contexts/ErrorContext';

const { Option } = Select;

export interface FormField {
  label: string;
  name: string;
  type: 'input' | 'select';
  placeholder?: string;
  inputType?: string; // e.g., 'email'
  options?: { label: ReactNode; value: string }[];
  rules?: any[];
}

interface AddPageProps {
  title: string;
  fields: FormField[];
  submitLabel?: string;
  backLink: string;
  onSubmit: (values: any) => Promise<void>;
}

const AddPage = ({ title, fields, submitLabel = 'Submit', backLink, onSubmit }: AddPageProps) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { setError } = useError();

  const handleFinish = async (values: any) => {
    try {
      await onSubmit(values);
      message.success(`${title} added successfully!`);
      setError(null);
      navigate(backLink);
    } catch (err: any) {
      console.error(err);
      const apiError = err.response?.data?.error || `Failed to add ${title.toLowerCase()}.`;
      setError(apiError);
      message.error(apiError);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h2 className={styles.title}>Add {title}</h2>
      </div>

      <div className={styles.card}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          requiredMark={false}
        >
          {fields.map((field) => (
            <Form.Item
              key={field.name}
              label={field.label}
              name={field.name}
              rules={field.rules}
            >
              {field.type === 'input' ? (
                <Input
                  placeholder={field.placeholder}
                  type={field.inputType || 'text'}
                  className={styles.input}
                />
              ) : (
                <Select placeholder={field.placeholder} className={styles.input}>
                  {field.options?.map((opt) => (
                    <Option key={opt.value} value={opt.value}>
                      {opt.label}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          ))}
        </Form>
      </div>

      <div className={styles.footerActions}>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(backLink)}
          className={styles.backButton}
        >
          Back
        </Button>
        <Button
          type="primary"
          onClick={() => form.submit()}
          className={styles.submitButton}
        >
          {submitLabel}
        </Button>
      </div>
    </div>
  );
};

export default AddPage;
