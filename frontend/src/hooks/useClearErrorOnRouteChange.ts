import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useError } from '../contexts/ErrorContext';

const useClearErrorOnRouteChange = () => {
  const location = useLocation();
  const { setError } = useError();

  useEffect(() => {
    setError(null);
  }, [location.pathname, setError]);
};

export default useClearErrorOnRouteChange;
