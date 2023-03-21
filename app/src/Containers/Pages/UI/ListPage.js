import { Col, Row, Card, Typography, Button } from "antd";
import React from "react";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";


const { Title } = Typography;

export default function ListPage(props) {
  const { title } = props;
  return (
    <Row gutter={[15, 15]}>
      <Col>
        <Title level={3} style={{ margin: 0, paddingLeft: 5 }}>{title}</Title>

      </Col>
      <Col xs={24}>
        <Card bodyStyle={{ padding: 10 }}>
          <Row gutter={[10,10]}>
            <Col>
              <Button type="dashed" shape="circle" icon={<ReloadOutlined />} />
            </Col>
            <Col>
              <Button type="primary" icon={<PlusOutlined />}>Adicionar</Button>
            </Col>
          </Row>

        </Card>
      </Col>
    </Row>
  )
}