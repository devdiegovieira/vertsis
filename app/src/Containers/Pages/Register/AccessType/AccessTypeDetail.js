import React, { useEffect, useState } from "react";
import FormPage from "../../UI/FormPage";
import { Form, Input, Switch, App, Select, Space } from "antd";
import axios from "../../../../api";


export default function AccessTypeDetail() {
  const [data, setData] = useState({ active: true });
  const { notification } = App.useApp();

  const [form] = Form.useForm();



  const getData = (filter) => {
    const id = window.location.pathname.split('/').slice(-1)[0];

    if (id != 'new') {
      axios.get(`access-type/${id}`)
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
    axios.post(`access-type`, { ...formData, _id })
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
    <FormPage title={'Edição de Tipo de Acesso'} data={data} onSubmit={submit} form={form}>

      <Form.Item
        name="name"
        id="name"
        label="Nome"
        rules={[{ required: true, message: 'Por favor preencha o nome' }]}
      >
        <Input placeholder="Preencha o nome" autoFocus />
      </Form.Item>

      <Form.Item
        name="accessType"
        id="rule"
        label="Tipo de Acesso"
        rules={[{ required: true, message: 'Bloco obrigatório' }]}
      >
        <Select
          allowClear
          placeholder="Selecione o tipo de acesso"

          filterOption={false}
          options={[
            {
              value: 'unique',
              label: 'Único'
            },
            {
              value: 'interval',
              label: 'Tempo'
            },
            {
              value: 'indeterminate',
              label: 'Indeterminado'
            }
          ]}
        />
      </Form.Item>

      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.accessType !== currentValues.accessType}
      >
        {({ getFieldValue }) => {

          return getFieldValue('accessType') == 'interval' &&
            (
              <Form.Item label="Período">
                <Space.Compact>
                  <Form.Item
                    name='periodType'
                    id='periodType'
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: 'Grupo obrigatório',
                      },
                    ]}
                  >
                    <Select placeholder="Grupo">
                      <Option value="day">Dia</Option>
                      <Option value="month">Mês</Option>
                      <Option value="year">Ano</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name='period'
                    id='period'
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: 'Quantidade obrigatória',
                      },
                    ]}
                  >
                    <Input
                      style={{
                        width: '130%',
                      }}
                      placeholder="Quantidade"
                    />
                  </Form.Item>

                </Space.Compact>
              </Form.Item>

            )
        }}
      </Form.Item>

      <Form.Item
        name="conciergeShow"
        id="conciergeShow"
        label="Mostrar na portaria"
        valuePropName="checked"
      >
        <Switch />
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