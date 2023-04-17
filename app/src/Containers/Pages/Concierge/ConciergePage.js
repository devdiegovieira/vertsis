import { BarChartOutlined, BarcodeOutlined, CalendarOutlined, DatabaseOutlined, UserAddOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Avatar, Col, Row, Space, Typography } from "antd";
import React, { useEffect } from "react";
import Card from "../../Components/Card";
import axios from "./../../../api"
import TopNavigation from "../UI/TopNavigation";
import VideoCapture from "./VideoCapture";
import ConciergeVisit from "./ConciergeVisit";

const { Title } = Typography;

export default function ConciergePage(props) {

  return (
    <>
      <Row gutter={[15, 15]}>
        <Col xs={24}>
          <TopNavigation />
        </Col>

        <Col flex={'none'}>

          <VideoCapture />

          asdasdasd

        </Col >


        <Col flex={'auto'}>
          <ConciergeVisit />
        </Col>

      </Row >
    </>
  )
}