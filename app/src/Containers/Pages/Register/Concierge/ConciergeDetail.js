import React, { useEffect, useState } from "react";
import FormPage from "../../UI/FormPage";
import { Form, Input, Switch, App } from "antd";
import axios from "../../../../api";


export default function ConciergeDeail() {
  const [data, setData] = useState({ active: true });
  const { notification } = App.useApp();

  const [form] = Form.useForm();



  const getData = (filter) => {
    const id = window.location.pathname.split('/').slice(-1)[0];

    if (id != 'new') {
      axios.get(`concierge/${id}`)
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
    axios.post(`concierge`, { ...formData, _id })
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
    <FormPage title={'Edição de Portaria'} data={data} onSubmit={submit} form={form}>
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