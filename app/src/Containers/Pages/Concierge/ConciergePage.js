import { Col, Divider, Row, Tabs, Typography } from "antd";
import React from "react";
import TopNavigation from "../UI/TopNavigation";
import VideoCapture from "./VideoCapture";
import ConciergeVisit from "./ConciergeVisit";
import AccessList from "./AccessList";
import Clock from "./Clock";

const { Title } = Typography;

export default function ConciergePage(props) {
  const items = [
    {
      key: '1',
      label: `Acessos`,
      children: <ConciergeVisit />,
    },
    {
      key: '2',
      label: `Encomendas`,
      children: `Content of Tab Pane 2`,
    },
  ];
  return (
    <>
      <Row gutter={[15, 15]}>
        <Col xs={24}>
          <TopNavigation />
        </Col>

        <Col flex={'auto'}>
          <Tabs defaultActiveKey="1" items={items} type="card" tabBarStyle={{ margin: 0, border: 'none' }} />
        </Col>

        <Col flex={'none'} style={{ paddingTop: 5 }}>
          <Clock />
          <VideoCapture />

          <Title level={4} style={{ margin: 0, marginTop: 10 }}>Ultimos acessos</Title>
          <Divider style={{ margin: 0 }} />
          <AccessList />

        </Col >
      </Row >
    </>
  )
}