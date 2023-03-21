import { Col, Menu, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNavigation from "./TopNavigation";


export default function TabPage(props) {
  const { items = [] } = props;

  const navigate = useNavigate();
  const [selected, setSelected] = useState([window.location.pathname.split('/')[2]]);

  useEffect(() => {
    setSelected([window.location.pathname.split('/')[2]])
  }, [window.location.pathname])

  return (
    <Row gutter={[10, 10]}>
      <Col xs={24}>
        <TopNavigation subMenu={items} />
      </Col>
      <Col flex={'none'}>
        <Menu
          style={{ width: 256 }}
          onClick={menu => { navigate(`/${window.location.pathname.split('/')[1]}/${menu.key}`) }}
          selectedKeys={selected}
          items={items}
        />
      </Col>
      <Col flex={'auto'}>
        {
          items.find(f => f.key == selected) && items.find(f => f.key == selected).page
        }
      </Col>

    </Row>

  )
}