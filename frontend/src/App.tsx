import { Layout } from 'antd';
import { Routes, Route } from 'react-router-dom';
import Teachers from './pages/Teachers/Teachers';
import AddTeacher from './pages/AddTeacher/AddTeacher';
import Classes from './pages/Classes/Classes';
import AddClass from './pages/AddClass/AddClass';
import HeaderBar from './components/HeaderBar/HeaderBar';

const { Content } = Layout;

function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <HeaderBar />
      <Content>
        <Routes>
          <Route path="/" element={<Teachers />} />
          <Route path="/add-teacher" element={<AddTeacher />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/add-class" element={<AddClass />} />
        </Routes>
      </Content>
    </Layout>
  );
}

export default App;