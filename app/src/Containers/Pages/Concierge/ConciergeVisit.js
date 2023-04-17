import React, { useEffect, useState } from "react";
import FormPage from "../UI/FormPage";
import { Form, Input, Switch, App, DatePicker, Select, AutoComplete } from "antd";
import axios from "./../../../api";
import { SearchOutlined } from "@ant-design/icons";
import FindUnity from "../../Components/Common/FindUnity";
import FindPeopleType from "../../Components/Common/FindPeopleType";
import ImageUpload from "../../Components/ImageUpload";


export default function ConciergeVisit() {
  const [data, setData] = useState({ active: true });
  const { notification } = App.useApp();


  const getData = (filter) => {
    const id = window.location.pathname.split('/').slice(-1)[0];

    // if (id != 'new') {
    //   axios.get(`block/${id}`)
    //     .then((data) => {
    //       setData(data);
    //     })
    //     .catch((err) => {
    //       notification.error({
    //         message: `Erro`,
    //         description: err,
    //         placement: 'bottomLeft',
    //       });
    //     });
    // }
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
    <FormPage title={'Registro de Acesso'} data={data} onSubmit={submit} clear>
      <Form.Item
        name="cpf"
        id="cpf"
        label="Cpf"
        rules={[{ required: true, message: 'CPF Obrigatório' }]}
      >
        <Input
          placeholder="Preencha o cpf para começar"
          autoFocus
          prefix={<SearchOutlined />}
          allowClear
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
        <DatePicker allowClear />
      </Form.Item>

      <Form.Item
        name="phone"
        id="phone"
        label="Telefone de Contato"
        rules={[{ required: true, message: 'Telefone obrigatório' }]}
      >
        <Input placeholder="Preencha o telefone" allowClear />
      </Form.Item>

      <Form.Item
        name="unityId"
        id="unityId"
        label="Unidade / Morador"
        rules={[{ required: true, message: 'Unidade obrigatória' }]}
      >
        <AutoComplete
          // dropdownMatchSelectWidth={252}
          options={[
            {
              value: 1,
              label: '1 - Diego Vieira / Stefanie Almeida'
            }
          ]}
        // onSelect={onSelect}
        // onSearch={handleSearch}
        />

        {/* <FindUnity /> */}
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
          options={[
            { value: 1, label: 'Visitante' },
            { value: 2, label: 'Entregador' },
            { value: 3, label: 'Prestador de Serviço' },
          ]}
        />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
        }}
      >
        <ImageUpload />
      </Form.Item>
    </FormPage>
  )
}