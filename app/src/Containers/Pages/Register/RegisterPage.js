import { AppstoreAddOutlined, GroupOutlined, LockOutlined, SplitCellsOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import React from "react";
import TabPage from "../UI/TabPage";
import BlockPage from "./Block/BlockPage";
import UnityPage from "./Unity/UnityPage";
import AccessTypePage from "./AccessType/AccessTypePage";
import ConciergePage from "./Concierge/ConciergePage";
import PeoplePage from "./People/PeoplePage";


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
      key: 'access-type',
      icon: <LockOutlined />,
      label: 'Tipos de Acesso',
      page: <AccessTypePage />
    },
    {
      key: 'people',
      icon: <UsergroupAddOutlined />,
      label: 'Pessoas',
      page: <PeoplePage />
    },
    // {
    //   key: 'vehicles',
    //   icon: <CarOutlined />,
    //   label: 'Veículos',
    // },
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
      key: 'concierge',
      icon: <SplitCellsOutlined />,
      label: 'Portaria  ',
      page: <ConciergePage />
    },
  ]

  return (
    <TabPage items={items} />
  )
}