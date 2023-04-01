import React from "react";
import { Avatar, Col, Layout, Row, Space } from 'antd';
import logo from './../../Img/vertsislogo.png'
import { UserOutlined } from '@ant-design/icons';

const { Header, Footer, Content } = Layout;

export default function UserInterface(props) {
  const { children } = props;
  return (
    <Layout>
      <Header style={{ backgroundColor: '#fff', padding: 10, paddingRight: 20, paddingLeft: 20, height: 65 }}>
        <Row justify={'space-between'} align={'middle'}>
          {/* <Col> */}
            <img
              src={logo}
              height={50}
            />
          {/* </Col>
          <Col> */}
              <Avatar size={'large'} icon={<UserOutlined />} />
          {/* </Col> */}
        </Row>
      </Header>

      <Content
        style={{
          // backgroundColor: '#fff',
          padding: 10,
          height: "calc(100vh - 110px",
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