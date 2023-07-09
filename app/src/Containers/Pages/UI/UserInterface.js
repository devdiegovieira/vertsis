import React from "react";
import { Avatar, Col, Dropdown, Layout, Row, Space, theme } from 'antd';
import logo from './../../Img/vertsislogo.png'
import { UserOutlined } from '@ant-design/icons';

const { Header, Footer, Content } = Layout;

export default function UserInterface(props) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          1st menu item
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          2nd menu item
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          3rd menu item
        </a>
      ),
    },
  ];

  const { children } = props;
  return (
    <Layout>
      <Header style={{ background: colorBgContainer, padding: 10, paddingRight: 20, paddingLeft: 20, height: 65 }}>
        <Row justify={'space-between'} align={'middle'}>
          {/* <Col> */}
          <img
            src={logo}
            height={50}
          />
          {/* </Col>
          <Col> */}
          <Dropdown
            menu={{
              items,
            }}
            placement="bottomRight"
            arrow
          >
            <Avatar size={'large'} icon={<UserOutlined />} />
          </Dropdown>     {/* </Col> */}
        </Row>
      </Header>

      <Content
        style={{
          // backgroundColor: '#fff',
          padding: 10,
          height: "calc(100vh - 105px",
          flexGrow: 1,
          overflow: 'auto',
        }}
      >
        {children}
      </Content>

      <Footer
        style={{
          // backgroundColor: '#fff',
          padding: 10
        }}
      >
        <Row xs={24} justify={'center'} align={'middle'} style={{ height: 20, textAlign: 'center' }}>
          {`Copyright © Adsis Desenvolvimento de Sistemas Ltda. - Todos os direitos reservados ${new Date().getFullYear()}.`}
        </Row>
      </Footer>
    </Layout>


  )
}