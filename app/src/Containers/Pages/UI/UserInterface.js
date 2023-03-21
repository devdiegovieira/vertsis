import React from "react";
import { Avatar, Layout, Row, Space } from 'antd';
import logo from './../../Img/vertsislogo.png'
import { UserOutlined } from '@ant-design/icons';

const { Header, Footer, Content } = Layout;

export default function UserInterface(props) {
  const { children } = props;
  return (
    <Layout>
      <Header style={{ backgroundColor: '#fff', padding: 10, paddingRight: 20, paddingLeft: 20, height: 70 }}>
        <Row xs={24} justify={'space-between'}>
          <img
            src={logo}
            height={50}
          />

          <Avatar size={'large'} icon={<UserOutlined />} />
        </Row>
      </Header>
      
      <Content
        style={{
          backgroundColor: '#fff',
          paddingLeft: 20,
          paddingRight: 20,
          paddingLeft: 20,
          height: "calc(100vh - 130 px)",
          flexGrow: 1,
          overflow: 'auto',
        }}
      >
        {children}
      </Content>
      
      <Footer
        style={{
          backgroundColor: '#fff',
          padding: 10
        }}
      >
        <Row xs={24} justify={'center'} align={'middle'} style={{ height: 20, textAlign: 'center'}}>
          {`Copyright © Adsis Desenvolvimento de Sistemas Ltda. - Todos os direitos reservados ${new Date().getFullYear()}.`}
        </Row>
      </Footer>
    </Layout>


  )
}