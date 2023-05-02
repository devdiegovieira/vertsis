import React, { useEffect, useState } from "react";
import FormPage from "../../UI/FormPage";
import { Form, Input, Switch, App, Select } from "antd";
import axios from "../../../../api";


export default function UnityDetail() {
  const [data, setData] = useState({ active: true });
  const [blocks, setBlocks] = useState([]);
  const { notification } = App.useApp();

  const [form] = Form.useForm();

  const getBlocks = (filter) => {

    axios.get('block', {
      params: {
        search: filter
      }
    })
      .then((data) => {
        setBlocks(data.map(m => { return { value: m._id, label: m.name } }));
      })
      .catch((err) => {
        notification.error({
          message: `Erro`,
          description: err,
          placement: 'bottomLeft',
        });
      });
  }


  const getData = (filter) => {
    const id = window.location.pathname.split('/').slice(-1)[0];

    if (id != 'new') {
      axios.get(`unity/${id}`)
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
    };

    getBlocks();
  }

  useEffect(() => {
    getData()
  }, [])


  const submit = (formData) => {
    const { _id } = data;
    axios.post(`unity`, { ...formData, _id })
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



  const searchBlocks = (e) => {
    getBlocks(e);
  }



  return (
    <FormPage title={'Edição de Unidade'} data={data} onSubmit={submit} form={form}>
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
        name="blockId"
        id="blockId"
        label="Bloco"
        rules={[{ required: true, message: 'Bloco obrigatório' }]}
      >
        <Select
          allowClear
          showSearch
          placeholder="Selecione o bloco"
          filterOption={false}
          options={blocks}
          onSearch={searchBlocks}
          onChange={(e) => {
            if (!e) getBlocks()
          }}
        />


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