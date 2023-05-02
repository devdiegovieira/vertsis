import { App, Avatar, Switch } from "antd";
import React, { useState } from "react";
import CrudPage from "../../UI/ListPage";
import PeopleDetail from "./PeopleDetail";
import axios from "../../../../api";
import { useUrlParams } from "../../../../utils/hooks";

export default function PeoplePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { notification } = App.useApp();

  const getData = () => {
    setLoading(true);

    axios.get('people', {
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
    axios.delete(`people/${item._id}`)
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
      title: '',
      dataIndex: 'peoplePic',
      render: (value) => {
        return <Avatar src="" />
      },
    },
    {
      title: 'CPF',
      dataIndex: 'cpf',
    },
    {
      title: 'Nome',
      dataIndex: 'name',
    },
    {
      title: 'Telefone',
      dataIndex: 'phone',
    },
    {
      title: 'Dt. Nascimento',
      dataIndex: 'birthDate',
      render: (value) => {
        return new Date(value).toLocaleString()
      },
    },
    {
      title: 'Tipo de Acesso',
      dataIndex: 'peopleType',
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
      resource={'people'}
      resourceId={'_id'}
      title={'Cadastro de Pessoas'}
      getData={getData}
      data={data}
      pageSize={20}
      loading={loading}
      columns={columns}
      onDelete={onDelete}
      detail={<PeopleDetail />}
    />


  )
}