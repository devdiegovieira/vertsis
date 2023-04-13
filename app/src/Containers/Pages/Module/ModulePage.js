import { BarChartOutlined, BarcodeOutlined, CalendarOutlined, DatabaseOutlined, UserAddOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Avatar, Col, Row, Space, Typography } from "antd";
import React, { useEffect } from "react";
import Card from "../../Components/Card";
import axios from "./../../../api"

const { Title } = Typography;

export default function ModulePage(props) {
  const modules = [
    {
      title: 'Cadastros',
      description: 'Cadastros administrativos do sistema (blocos, unidades, áreas comuns, moradores...)',
      icon: <Avatar style={{ backgroundColor: '#e861dd' }} icon={<DatabaseOutlined />} />,
      path: '/register'
    },
    {
      title: 'Portaria',
      description: 'Cadastro e controle de acesso de visitantes, prestadores de serviço e controle de encomendas.',
      icon: <Avatar style={{ backgroundColor: '#a81344' }} icon={<VideoCameraOutlined />} />,
      path: '/concierge'
    },
    {
      title: 'Usuários',
      description: 'Administração de Usuários e Grupo de Usuários do sistema, gestão de acesso dos módulos. ',
      icon: <Avatar style={{ backgroundColor: '#321bcc' }} icon={<UserAddOutlined />} />,
      path: '/user'
    },
    {
      title: 'Relatórios',
      description: 'Módulo de relatórios gerenciais e dashboards administrativos do sistema.',
      icon: <Avatar style={{ backgroundColor: '#e7f20f' }} icon={<BarChartOutlined />} />,
      path: '/report'
    },
    {
      title: 'Agenda',
      description: 'Agenda virtual com eventos, informativos, advertências e controle de reserva das áreas úteis.',
      icon: <Avatar style={{ backgroundColor: '#de6514' }} icon={<CalendarOutlined />} />,
      path: '/schedule'
    },
    {
      title: 'Financeiro',
      description: 'Resumo financeiro do morador, com emissão de segunda via e consulta de pagamentos anteriores.',
      icon: <Avatar style={{ backgroundColor: '#039122' }} icon={<BarcodeOutlined />} />,
      path: '/financial'
    }
  ];

  useEffect(() => {
    axios.get('auth/verify')
  }, [])

  return (
    <Row>
      <Col>
        <Title style={{paddingLeft: 10}} level={3}>Módulos disponíveis</Title>
      </Col>

      <Col>
        <Row >
          {/* <Space size="middle"> */}
            {
              modules.map((m, i) => {
                return (
                  <Col style={{margin: 10}} key={i}>
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