import { AppstoreAddOutlined, ArrowLeftOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Col, Menu, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useAsyncValue, useNavigate, useParams } from "react-router-dom";


export default function TabPage(props) {
  const { items = [] } = props;

  const navigate = useNavigate();
  const [selected, setSelected] = useState([window.location.pathname.split('/')[2]]);

  useEffect(() => {
    setSelected([window.location.pathname.split('/')[2]])
  }, [window.location.pathname])

  return (
    <Row align={"middle"} gutter={[16, 16]}>
      <Col flex="none">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          size='large'
        >
          Voltar
        </Button>
      </Col>
      <Col flex="auto" >
        <Breadcrumb
          items={[
            {
              href: '/',
              title: <HomeOutlined />,
            },
            ...window.location.pathname.split('/').filter(f => f).map(m => {
              let item = items.find(f => f.key == m)

              return {
                href: item ? `/${window.location.pathname.split('/')[1]}/${m}` : '',
                title: <>
                  {item ? item.icon : ''}
                  <span>{item ? item.label : m}</span>
                </>
              }
            })
          ]}
        />
      </Col>
      <Col xs={24}>
        <Menu
          style={{ width: 256 }}
          onClick={menu => { navigate(`/${window.location.pathname.split('/')[1]}/${menu.key}`) }}
          selectedKeys={selected}
          items={items}
        />
      </Col>

    </Row>

  )
}