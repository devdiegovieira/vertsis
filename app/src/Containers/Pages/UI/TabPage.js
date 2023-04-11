import { Col, Menu, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNavigation from "./TopNavigation";


export default function TabPage(props) {
  const { items = [] } = props;

  const showMenu = window.location.pathname.split('/').length <= 3;

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
      {
        showMenu &&
        <Col xl={3} lg={5} md={6} sm={8} xs={24}>
        <Menu
          // style={{ width: 256 }}
          onClick={menu => { navigate(`/${window.location.pathname.split('/')[1]}/${menu.key}`) }}
          selectedKeys={selected}
          items={items}
        />
      </Col>

      }
      <Col xl={showMenu ? 21 : 24} lg={showMenu ? 19 : 24 } md={showMenu ? 18 : 24} sm={showMenu ? 16 : 24} xs={24}>
        {
          items.find(f => f.key == selected) && items.find(f => f.key == selected).page
        }
      </Col>

    </Row>

  )
}