import { BarChartOutlined, BarcodeOutlined, CalendarOutlined, DatabaseOutlined, UserAddOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

const modules = [
  {
    title: 'Cadastros',
    description: 'Cadastros administrativos do sistema (blocos, unidades, áreas comuns, moradores...)',
    icon: <DatabaseOutlined />,
    avatar: <Avatar style={{ backgroundColor: '#e861dd' }} icon={<DatabaseOutlined />} />,
    path: '/register'
  },
  {
    title: 'Portaria',
    description: 'Cadastro e controle de acesso de visitantes, prestadores de serviço e controle de encomendas.',
    icon: <VideoCameraOutlined />,
    avatar: <Avatar style={{ backgroundColor: '#a81344' }} icon={<VideoCameraOutlined />} />,
    path: '/concierge'
  },
  {
    title: 'Usuários',
    description: 'Administração de Usuários e Grupo de Usuários do sistema, gestão de acesso dos módulos. ',
    icon: <UserAddOutlined />,
    avatar: <Avatar style={{ backgroundColor: '#321bcc' }} icon={<UserAddOutlined />} />,
    path: '/user'
  },
  {
    title: 'Relatórios',
    description: 'Módulo de relatórios gerenciais e dashboards administrativos do sistema.',
    icon: <BarChartOutlined />,
    avatar: <Avatar style={{ backgroundColor: '#e7f20f' }} icon={<BarChartOutlined />} />,
    path: '/report'
  },
  {
    title: 'Agenda',
    description: 'Agenda virtual com eventos, informativos, advertências e controle de reserva das áreas úteis.',
    icon: <CalendarOutlined />,
    avatar: <Avatar style={{ backgroundColor: '#de6514' }} icon={<CalendarOutlined />} />,
    path: '/schedule'
  },
  {
    title: 'Financeiro',
    description: 'Resumo financeiro do morador, com emissão de segunda via e consulta de pagamentos anteriores.',
    icon: <BarcodeOutlined />,
    avatar: <Avatar style={{ backgroundColor: '#039122' }} icon={<BarcodeOutlined />} />,
    path: '/financial'
  }
];

export default modules; 