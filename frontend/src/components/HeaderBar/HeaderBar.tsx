import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { BookOutlined, TeamOutlined } from '@ant-design/icons';
import { GraduationCap } from 'lucide-react';
import styles from './HeaderBar.module.css';

const { Header } = Layout;

const HeaderBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Header className={styles.header}>
      <div className={styles.logoContainer}>
        <GraduationCap size={32} color="#135BB4" />
        <span className={styles.logoText}>School Portal</span>
      </div>
      <Menu
        mode="horizontal"
        selectedKeys={['/', '/teachers', '/add-teacher'].includes(location.pathname) ? ['/'] : [location.pathname]}
        onClick={({ key }) => navigate(key)}
        className={styles.menu}
      >
        <Menu.Item key="/classes" icon={<BookOutlined />}>Classes</Menu.Item>
        <Menu.Item key="/" icon={<TeamOutlined />}>Teachers</Menu.Item>
      </Menu>
    </Header>
  );
};

export default HeaderBar;
