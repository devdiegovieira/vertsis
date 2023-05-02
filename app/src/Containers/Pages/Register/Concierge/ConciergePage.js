import { App, Switch } from "antd";
import React, { useState } from "react";
import CrudPage from "../../UI/ListPage";
import ConciergeDeail from "./ConciergeDetail";
import axios from "../../../../api";
import { useUrlParams } from "../../../../utils/hooks";

export default function ConciergePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { notification } = App.useApp();



  const getData = () => {
    setLoading(true);

    axios.get('concierge', {
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
    axios.delete(`concierge/${item._id}`)
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
      title: 'Dt. Criação',
      dataIndex: 'createdAt',
      render: (value) => {
        return new Date(value).toLocaleString()
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
      resource={'concierge'}
      resourceId={'_id'}
      title={'Cadastro de Portaria'}
      getData={getData}
      data={data}
      pageSize={20}
      loading={loading}
      columns={columns}
      onDelete={onDelete}
      detail={<ConciergeDeail />}
    />


  )
}