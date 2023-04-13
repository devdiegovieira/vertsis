import React, { useEffect, useState } from "react";
import FormPage from "../../UI/FormPage";
import { Form, Input, Switch, App } from "antd";
import axios from "./../../../../api";
import { useUrlParams } from "../../../../utils/hooks";


export default function BlockDeail() {
  const [data, setData] = useState({active: true});
  const { notification } = App.useApp();


  const getData = (filter) => {
    const id = window.location.pathname.split('/').slice(-1)[0];

    if (id != 'new') {
      axios.get(`block/${id}`)
        .then((data) => {
          setData(data);
        })
        .catch((err) => {
          notification.error({
            message: `Erro`,
            description: err,
            placement: 'bottomLeft',
          });
        });
    }
  }

  useEffect(() => {
    getData()
  }, [])


  const submit = (formData) => {
    const { _id } = data;
    axios.post(`block`, { ...formData, _id })
      .then(() => {
        history.go(-1)
      })
      .catch((err) => {
        notification.error({
          message: `Erro`,
          description: err,
          placement: 'bottomLeft',
        });
      });
  }

  return (
    <FormPage title={'Edição de Bloco'} data={data} onSubmit={submit}>
      <Form.Item
        name="code"
        id="code"
        label="Código"
        rules={[{ required: true, message: 'Por favor preencha um código único' }]}
      >
        <Input placeholder="Preencha o código" autoFocus />
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
        name="active"
        id="active"
        label="Ativo"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>
    </FormPage>
  )
}