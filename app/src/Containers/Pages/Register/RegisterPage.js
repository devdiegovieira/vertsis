import { AppstoreAddOutlined, CarOutlined, EnvironmentOutlined, GroupOutlined, MobileOutlined, UsergroupAddOutlined, WarningOutlined } from "@ant-design/icons";
import React from "react";
import TabPage from "../UI/TabPage";


export default function RegisterPage(props) {
  const items = [
    {
      key: 'block',
      icon: <GroupOutlined />,
      label: 'Blocos',
    },
    {
      key: 'unity',
      icon: <AppstoreAddOutlined />,
      label: 'Unidades',
    },
    {
      key: 'people',
      icon: <UsergroupAddOutlined />,
      label: 'Pessoas',
    },
    {
      key: 'vehicles',
      icon: <CarOutlined />,
      label: 'Veículos',
    },
    {
      key: 'common',
      icon: <EnvironmentOutlined />,
      label: 'Áreas Comuns',
    },
    {
      key: 'unitygroup',
      icon: <WarningOutlined />,
      label: 'Grupos de Acesso',
    },
    {
      key: 'gate',
      icon: <MobileOutlined />,
      label: 'Bloqueios',
    },
  ]

  return (
    <TabPage items={items}/>
  )
}