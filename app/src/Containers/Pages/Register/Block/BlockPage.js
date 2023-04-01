import { Switch } from "antd";
import React, { useState } from "react";
import CrudPage from "../../UI/ListPage";
import FormPage from "../../UI/FormPage";

export default function BlockPage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const getData = (filter) => {
    setLoading(true);


    console.log('chamada da api', filter)
    setTimeout(() => {
      setData([
        { code: 'B-A', name: 'Bloco A', isActive: true, createdAt: new Date('2022/01/05').toLocaleString() },
        { code: 'B-B', name: 'Bloco B', isActive: true, createdAt: new Date('2022/01/05').toLocaleString() },
        { code: 'B-C', name: 'Bloco C', isActive: true, createdAt: new Date('2022/01/05').toLocaleString() },
      ])
      setLoading(false)
    }, 1000);

  }

  const onDelete = (item) => {
    console.log('chamada da api de delete', item)
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
    },
    {
      title: 'Ativo',
      dataIndex: 'isActive',
      render: (value) => {
        return (<Switch checked={value} />)
      },
    },
  ]

  return (

    <CrudPage
      resource={'block'}
      resourceId={'code'}
      title={'Cadastro de Blocos'}
      getData={getData}
      data={data}
      pageSize={20}
      loading={loading}
      columns={columns}
      onDelete={onDelete}
      detail={<FormPage />}
    />


  )
}