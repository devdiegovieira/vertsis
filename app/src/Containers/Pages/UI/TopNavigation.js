import { ArrowLeftOutlined, DatabaseOutlined, HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Col, Row } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function TopNavigation(props) {
  const { menu = [], subMenu = [] } = props;
  const navigate = useNavigate();

  return (
    <Row align={"middle"} gutter={16}>
      <Col flex="none">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          size='large'
          onClick={() => { navigate('/') }}
        >
          Voltar
        </Button>
      </Col>
      <Col flex="auto">
        <Breadcrumb
          items={[
            {
              href: '/',
              title: <HomeOutlined />,
            },
            ...window.location.pathname.split('/').filter(f => f).map(m => {
              let item = subMenu.find(f => f.key == m)

              return {
                href: window.location.pathname.substring(0, window.location.pathname.indexOf(m) + m.length),
                title: <>
                  {item ? item.icon : m == 'register' ? <DatabaseOutlined /> : ''}
                  <span>{item ? item.label : m == 'register' ? 'Cadastros' : m}</span>
                </>
              }
            })
          ]}
        />
      </Col>
    </Row>
  )
}