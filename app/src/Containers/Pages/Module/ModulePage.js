import { Col, Row, Typography } from "antd";
import React, { useEffect } from "react";
import Card from "../../Components/Card";
import axios from "./../../../api"
import modules from "../../../utils/models";

const { Title } = Typography;

export default function ModulePage(props) {


  useEffect(() => {
    axios.get('auth/verify')
  }, [])

  return (
    <Row>
      <Col>
        <Title style={{ paddingLeft: 10 }} level={3}>Módulos disponíveis</Title>
      </Col>

      <Col>
        <Row >
          {/* <Space size="middle"> */}
          {
            modules.map((m, i) => {
              return (
                <Col style={{ margin: 10 }} key={i}>
                  <Card {...m} />
                </Col>
              )
            })
          }
          {/* </Space> */}
        </Row>


      </Col>


    </Row>
  )
}