import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import OrderDetails from './pages/OrderDetails';
import { Layout, Menu } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';


function App() {
  let navigate = useNavigate();
  return (
    <>
      <Layout>
        <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Menu
            theme="dark"
            mode="horizontal"
            style={{ display: 'flex', gap: '16px' }}
          >
            <Menu.Item
              key={1}
              onClick={() => navigate('/')}
            >
              <span style={{ whiteSpace: 'nowrap' }}>Home</span>
            </Menu.Item>
            <Menu.Item
              key={2}
              onClick={() => navigate('/details')}
            >
              Orders
            </Menu.Item>
          </Menu>
        </Header>

        <Content style={{ padding: '0 50px' }}>
          <div style={{ padding: 24, minHeight: 380 }}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/details' element={<OrderDetails />} />
            </Routes>

          </div>
        </Content>
        <Footer>

        </Footer>

      </Layout>
    </>
  )
}

export default App;
