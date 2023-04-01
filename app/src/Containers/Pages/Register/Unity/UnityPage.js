import { Switch } from "antd";
import React, { useState } from "react";
import CrudPage from "../../UI/ListPage";

export default function UnityPage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const getData = (filter) => {
    setLoading(true);


    console.log('chamada da api', filter)
    setTimeout(() => {
      setData([
        { code: '10A', name: '10', isActive: true, createdAt: new Date('2022/01/05').toLocaleString() },
        { code: '11A', name: '11', isActive: true, createdAt: new Date('2022/01/05').toLocaleString() },
        { code: '12A', name: '12', isActive: true, createdAt: new Date('2022/01/05').toLocaleString() },
      ])
      setLoading(false)
    }, 1000);

  }

  const onDelete = (item) => {
    console.log('chamada da api de delete', item)
  }

  const onEdit = (item) => {
    console.log('chamada da api de edição', item)
  }

  const onNew = () => {
    console.log('chamada da api de insert')
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
        return (<Switch checked={value}/>)
      },
    },
  ]

  return (
    <CrudPage
    
      title={'Cadastro de Unidades'}
      getData={getData}
      data={data}
      pageSize={20}
      loading={loading}
      columns={columns}
      actions={{
        new: {
          onClick: onNew
        },
        edit: {
          onClick: onEdit
        },
        delete: {
          onClick: onDelete
        }
      }}
    />
  )
}