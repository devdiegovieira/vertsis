import { Typography } from "antd";
import { React, useEffect, useState } from "react";

const { Title } = Typography;

export default function Clock() {
  const [clock, setClock] = useState(new Date());

  useEffect(() => {
    let interval = setInterval(() => {
      setClock(new Date())
    }, 1000);

    return () => {
      clearInterval(interval)
    }

  }, []);

  return (
    <Title level={3} style={{ margin: 0, opacity: '80%', paddingBottom: 5 }}> Condomío Alegria - {clock.toLocaleString()}</Title>
  )
}