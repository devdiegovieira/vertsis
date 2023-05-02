import { App, Switch } from "antd";
import React, { useState } from "react";
import CrudPage from "../../UI/ListPage";
import AccessTypeDetail from "./AccessTypeDetail";
import axios from "../../../../api";
import { useUrlParams } from "../../../../utils/hooks";

export default function AccessTypePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { notification } = App.useApp();

  const getData = () => {
    setLoading(true);

    axios.get('access-type', {
      params: useUrlParams(window.location.search)
    })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        notification.error({
          message: `Erro`,
          description: err,
          placement: 'bottomLeft',
        });
      });
  }

  const onDelete = (item) => {
    axios.delete(`access-type/${item._id}`)
      .then(() => {
        notification.success({
          message: `Sucesso`,
          description: 'Registro deletado com sucesso',
          placement: 'bottomLeft',
        });
        getData();
      })
      .catch((err) => {
        notification.error({
          message: `Erro`,
          description: err,
          placement: 'bottomLeft',
        });
      });
  }

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
    },
    {
      title: 'Tipo de Acesso',
      dataIndex: 'accessType',
      render: (value) => {
        switch (value) {
          case 'unique':
            return 'Único'
          case 'interval':
            return 'Tempo'
          case 'indeterminate':
            return 'Ineterminado'
          default:
            return '-'
        }
      },
    },
    {
      title: 'Grupo',
      dataIndex: 'periodType',
      render: (value) => {
        switch (value) {
          case 'day':
            return 'Dia'
          case 'month':
            return 'Mês'
          case 'year':
            return 'Ano'
          default:
            return '-'
        }
      },
    },
    {
      title: 'Quantidade',
      dataIndex: 'period',
      render: (value) => {
        return value ? value : '-';
      },
    },
    {
      title: 'Dt. Criação',
      dataIndex: 'createdAt',
      render: (value) => {
        return new Date(value).toLocaleString()
      },
    },
    {
      title: 'Mostrar na Portaria',
      dataIndex: 'conciergeShow',
      render: (value) => {
        return (<Switch checked={value} />)
      },
    },
    {
      title: 'Ativo',
      dataIndex: 'active',
      render: (value) => {
        return (<Switch checked={value} />)
      },
    },
  ]

  return (

    <CrudPage
      resource={'access-type'}
      resourceId={'_id'}
      title={'Cadastro de Tipos de Acesso'}
      getData={getData}
      data={data}
      pageSize={20}
      loading={loading}
      columns={columns}
      onDelete={onDelete}
      detail={<AccessTypeDetail />}
    />


  )
}