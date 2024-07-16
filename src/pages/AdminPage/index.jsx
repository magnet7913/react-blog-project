import '../LoginPage/login.css'
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Layout, Button, Input } from 'antd';
import CategoryControl from './CategoryControl';
import ChangePassword from './ChangePassword';
import ChangeUserDetail from './ChangeUserDetail';
import ArticleManagement from './ArticleManagement';
import ArticleForm from './ArticleForm';

const { Header, Footer, Sider, Content } = Layout;

function AdminPanel() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [activeComponent, setActiveComponent] = useState(1);

  let token = localStorage.getItem('token')
  useEffect(() => {
    if (token === null) {
      navigate('/');
    }
  }, [token]);

  return (
    <Layout style={{background:'white'}}>
      <Sider style={{ width: '20%', padding: '1%' }}>
        <Button block style={{ marginBottom: '10px', marginTop: '50px' }} onClick={() => setActiveComponent(1)} type={activeComponent === 1 ? "primary" : "default"}>Quản lý danh mục</Button>
        <Button block style={{ marginBottom: '10px' }} onClick={() => setActiveComponent(2)} type={activeComponent === 2 ? "primary" : "default"}>Quản lý bài viết</Button>
        <Button block style={{ marginBottom: '10px' }} onClick={() => setActiveComponent(3)} type={activeComponent === 3 ? "primary" : "default"}>Thêm/Chỉnh sửa bài viết</Button>
        <Button block style={{ marginBottom: '10px' }} onClick={() => setActiveComponent(4)} type={activeComponent === 4 ? "primary" : "default"}>Đổi thông tin cá nhân</Button>
        <Button block style={{ marginBottom: '10px' }} onClick={() => setActiveComponent(5)} type={activeComponent === 5 ? "primary" : "default"}>Đổi mật khẩu</Button>
      </Sider>
      {activeComponent === 1 && <CategoryControl />}
      {activeComponent === 2 && <ArticleManagement setActiveComponent={setActiveComponent}/>}
      {activeComponent === 3 && <ArticleForm />}
      {activeComponent === 4 && <ChangeUserDetail />}
      {activeComponent === 5 && <ChangePassword />}
      

    </Layout>
  )
}

export default AdminPanel