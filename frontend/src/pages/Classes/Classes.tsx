import { useEffect, useState } from 'react';
import axios from '../../utils/axiosInstance';
import ListPage from '../../components/ListPage/ListPage';
import useClearErrorOnRouteChange from '../../hooks/useClearErrorOnRouteChange';

interface ClassItem {
  name: string;
  level: string;
  formTeacher: {
    name: string;
  };
}

const Classes = () => {
  useClearErrorOnRouteChange();

  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/classes')
      .then(res => setClasses(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    { title: '#', dataIndex: 'key' },
    { title: 'Class Level', dataIndex: 'level' },
    { title: 'Class Name', dataIndex: 'name' },
    {
      title: 'Form Teacher',
      dataIndex: 'formTeacher',
      render: (formTeacher: any) => formTeacher?.name || '-',
    },
  ];

  const data = classes.map((c, i) => ({
    key: i + 1,
    ...c,
  }));

  return (
    <ListPage
      title="Classes"
      model="Class"
      data={data}
      columns={columns}
      loading={loading}
      addLink="/add-class"
      emptyMessage="There are no existing classes yet."
    />
  );
};

export default Classes;
