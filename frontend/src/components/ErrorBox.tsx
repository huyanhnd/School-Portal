import { Alert } from 'antd';
import { useError } from '../contexts/ErrorContext';

const ErrorBox = () => {
  const { error, setError } = useError();

  if (!error) return null;

  return (
    <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999, width: 300 }}>
      <Alert
        message="Error"
        description={error}
        type="error"
        closable
        onClose={() => setError(null)}
        showIcon
      />
    </div>
  );
};

export default ErrorBox;
