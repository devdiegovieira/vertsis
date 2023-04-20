import { ArrowLeftOutlined, DatabaseOutlined, HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Col, Row } from "antd";
import React from "react";
import modules from "../../../utils/models";
// import { useNavigate } from "react-router-dom";

export default function TopNavigation(props) {
  const { menu = [], subMenu = [] } = props;
  // const navigate = useNavigate();

  return (
    <Row align={"middle"} gutter={16}>
      <Col flex="none">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          size='large'
          onClick={() => {
            const path = window.location.pathname.split('/');
            // path.pop();
            path.length <= 3 ? location.href = '/' : history.go(-1)

          }}
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
              let mod = modules.find(f => f.path.replace('/', '') == m)
              return {
                href: window.location.pathname.substring(0, window.location.pathname.indexOf(m) + m.length),
                title: <>
                  {item ? item.icon : mod ? mod.icon : ''}
                  <span>{item ? item.label : mod ? mod.title : ''}</span>
                </>
              }
            })
          ]}
        />
      </Col>
    </Row>
  )
}