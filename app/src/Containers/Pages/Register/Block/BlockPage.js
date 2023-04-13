import { App, Switch, notification } from "antd";
import React, { useState } from "react";
import CrudPage from "../../UI/ListPage";
import BlockDeail from "./BlockDetail";
import axios from "./../../../../api";
import { useUrlParams } from "../../../../utils/hooks";

export default function BlockPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { notification } = App.useApp();



  const getData = () => {
    setLoading(true);

    axios.get('block', {
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
    axios.delete(`block/${item._id}`)
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
      title: 'Código',
      dataIndex: 'code',
    },
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
      resource={'block'}
      resourceId={'_id'}
      title={'Cadastro de Blocos'}
      getData={getData}
      data={data}
      pageSize={20}
      loading={loading}
      columns={columns}
      onDelete={onDelete}
      detail={<BlockDeail />}
    />


  )
}