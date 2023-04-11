import React, { useEffect, useState } from "react";
import FormPage from "../../UI/FormPage";
import { Form, Input, Switch } from "antd";

export default function BlockDeail() {
  const [data, setData] = useState({})

  const getData = (filter) => {

    console.log('chamada da api', filter)

    setData({
      code: 'B-A',
      name: 'Bloco A',
      isActive: false,
      createdAt: new Date('2022/01/05')
    })

  }

  useEffect(() => {
    getData()
  }, [])


  const submit = (formData) => {
    console.log(formData, data)
  }

  return (
    <FormPage title={'Edição de Bloco'} data={data} onSubmit={submit}>
      <Form.Item
        name="code"
        id="code"
        label="Código"
        rules={[{ required: true, message: 'Por favor preencha um código único' }]}
      >
        <Input placeholder="Preencha o código" autoFocus/>
      </Form.Item>

      <Form.Item
        name="name"
        id="name"
        label="Nome"
        rules={[{ required: true, message: 'Por favor preencha o nome' }]}
      >
        <Input placeholder="Preencha o nome" />
      </Form.Item>

      <Form.Item 
        name="isActive"
        id="isActive"
        label="Ativo" 
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>
    </FormPage>
  )
}