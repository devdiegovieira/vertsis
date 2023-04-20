import { AppstoreAddOutlined, CarOutlined, GroupOutlined, LockOutlined, MobileOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import React from "react";
import TabPage from "../UI/TabPage";
import BlockPage from "./Block/BlockPage";
import UnityPage from "./Unity/UnityPage";


export default function RegisterPage(props) {
  const items = [
    {
      key: 'block',
      icon: <GroupOutlined />,
      label: 'Blocos',
      page: <BlockPage />
    },
    {
      key: 'unity',
      icon: <AppstoreAddOutlined />,
      label: 'Unidades',
      page: <UnityPage />
    },
    {
      key: 'peopleType',
      icon: <LockOutlined />,
      label: 'Tipos de Acesso',
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
    // {
    //   key: 'common',
    //   icon: <EnvironmentOutlined />,
    //   label: 'Áreas Comuns',
    // },
    // {
    //   key: 'unitygroup',
    //   icon: <WarningOutlined />,
    //   label: 'Grupos de Acesso',
    // },
    {
      key: 'gate',
      icon: <MobileOutlined />,
      label: 'Bloqueios',
    },
  ]

  return (
    <TabPage items={items} />
  )
}