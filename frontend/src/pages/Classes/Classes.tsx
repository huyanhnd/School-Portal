import { useEffect, useState } from 'react';
import ListPage from '../../components/ListPage/ListPage';
import useClearErrorOnRouteChange from '../../hooks/useClearErrorOnRouteChange';
import { getAllClasses } from '../../api/class';
import { message } from 'antd';

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
    const fetchClasses = async () => {
      try {
        const res = await getAllClasses();
        setClasses(res.data.data);
      } catch (err: any) {
        const errorMsg = err.response?.data?.error || 'Failed to load classes.';
        message.error(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
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
