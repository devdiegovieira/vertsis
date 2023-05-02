import React, { useEffect, useState } from "react";
import FormPage from "../UI/FormPage";
import { Form, Input, App, DatePicker, Select, Image, Row, Col, Alert, Button } from "antd";
import axios from "./../../../api";
import { CameraOutlined, SearchOutlined } from "@ant-design/icons";
import { maskCpf, maskDate, maskPhone } from "../../../utils/masks";


export default function ConciergeVisit() {
  const [data, setData] = useState({ active: true });
  const [accessType, setAccessType] = useState([]);
  const [unity, setUnity] = useState([]);
  const { notification } = App.useApp();

  const [form] = Form.useForm();


  const getData = (filter) => {
    const id = window.location.pathname.split('/').slice(-1)[0];

    if (id != 'new') {
      axios.get(`access-type`, {
        params: {
          concierge: true
        }
      })
        .then((data) => {
          setAccessType(data.map(m => {
            return {
              value: m._id,
              label: m.name
            }
          }));
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

  const searchUnity = () => {
    axios.get(`access-type`, {
      params: {
        concierge: true
      }
    })
      .then((data) => {
        setAccessType(data.map(m => {
          return {
            value: m._id,
            label: m.name
          }
        }));
      })
      .catch((err) => {
        notification.error({
          message: `Erro`,
          description: err,
          placement: 'bottomLeft',
        });
      });
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
    <FormPage title={'Registro de Acesso'} data={data} onSubmit={submit} clear cardHeight={'76vh'} form={form}>
      <Form.Item
        name="unityId"
        id="unityId"
        label="Unidade / Morador"
        rules={[{ required: true, message: 'Unidade obrigatória' }]}
      >
        <Select
          allowClear
          showSearch
          autoFocus
          options={[
            {
              value: 1,
              label: '1 - Diego Vieira / Stefanie Almeida'
            }
          ]}
          onSearch={(e) => {
            // if (!e) setUnity()
          }}
        />


      </Form.Item>

      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.unityId !== currentValues.unityId}
      >
        {({ getFieldValue }) => {

          return getFieldValue('unityId') &&
            (
              <Form.Item
                wrapperCol={{
                  offset: 7
                }}
              >
                <Alert message={
                  <Row style={{ maxWidth: 300 }}>
                    <Col xs={24}>
                      <p style={{ fontSize: 12, margin: 0 }}>Morador 1: <b>Diego Vieira (11) 98673-3433</b></p>
                    </Col>
                    <Col xs={24}>
                      <p style={{ fontSize: 12, margin: 0 }}>Morador 2: <b>Stefanie Almeida (11) 97217-5264</b></p>
                    </Col>
                    <Col xs={24}>
                      <p style={{ fontSize: 12, margin: 0 }}>Interfone: <b>46</b></p>
                    </Col>
                    <Col xs={24}>
                      <p style={{ fontSize: 12, margin: 0 }}>End: <b>Rua Castanhas 01</b></p>
                    </Col>

                  </Row>
                } type="success" showIcon />
              </Form.Item>

            )

        }}
      </Form.Item>

      <Form.Item
        name="cpf"
        id="cpf"
        label="CPF"
        rules={[{ required: true, message: 'CPF Obrigatório' }]}
      >
        <Input
          placeholder="Preencha o cpf"
          prefix={<SearchOutlined />}
          allowClear
          onChange={(e) => {
            form.setFieldValue('cpf', maskCpf(e.target.value));
          }}
        />
      </Form.Item>

      <Form.Item
        name="name"
        id="name"
        label="Nome Completo"
        rules={[{ required: true, message: 'Por favor preencha o nome' }]}
      >
        <Input placeholder="Preencha o nome" allowClear />
      </Form.Item>

      <Form.Item
        name="birthDate"
        id="birthDate"
        label="Data de Nascimento"
        rules={[{ required: true, message: 'Data de nascimento é obrigatória' }]}
      >
        <DatePicker
          allowClear
          format={'DD/MM/YYYY'}
          onKeyDown={(e) => {
            e.target.value = maskDate(e.target.defaultValue)
          }}
        />
      </Form.Item>

      <Form.Item
        name="phone"
        id="phone"
        label="Telefone de Contato"
        rules={[{ required: true, message: 'Telefone obrigatório' }]}
        onChange={(e) => {
          form.setFieldValue('phone', maskPhone(e.target.value));
        }}
      >
        <Input placeholder="Preencha o telefone" allowClear />
      </Form.Item>

      <Form.Item
        name="peopleTypeId"
        id="peopleTypeId"
        label="Tipo de Acesso"
        rules={[{ required: true, message: 'Tipo de acesso obrigatório' }]}
      >
        {/* <FindPeopleType /> */}
        <Select
          allowClear
          placeholder='Seleciona o tipo de Acesso'
          options={accessType}
        />
      </Form.Item>

      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.pics !== currentValues.pics}
      >
        {({ getFieldValue }) => {

          return getFieldValue('pics') &&
            (
              <Form.Item
                wrapperCol={{
                  offset: 7
                }}
              >
                <Row gutter={[10, 10]}>
                  <Col>
                    <Image
                      width={120}
                      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    />
                  </Col>
                  <Col>
                    <Image
                      width={120}
                      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    />
                  </Col>
                </Row>
              </Form.Item>
            )
        }}
      </Form.Item>


      <Form.Item
        wrapperCol={{
          offset: 7
        }}
      >
        <Button icon={<CameraOutlined />}>Capturar Imagens</Button>
      </Form.Item>
    </FormPage>
  )
}