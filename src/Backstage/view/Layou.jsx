import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Layout, Menu, Popover, theme, Button } from 'antd';
import LogoImage from '../assets/img/logo.png'
import LogoImage2 from '../assets/img/logo2.png'
const { Header, Content, Sider } = Layout;
const content = (
  <div>
    <Button type="primary" danger style={{width:"100%"}}>
      退出账号
    </Button>
  </div>
);
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,
    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout style={{ height: "100vh" }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          background: 'rgb(255, 255, 255)',
          justifyContent: 'space-between'
        }}
      >
        <div>
          <img src={LogoImage} alt=""></img>
          <img src={LogoImage2} alt=""></img>
        </div>
        <div>
          <Popover content={content} title='欢迎回来xxxxxx'>
            <Avatar size={50} icon={<UserOutlined />} />
          </Popover>
        </div>
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{
              height: '100%',
              borderRight: 0,
            }}
            items={items2}
          />
        </Sider>
        <Layout
          style={{
            padding: '24px',
          }}
        >
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default App;