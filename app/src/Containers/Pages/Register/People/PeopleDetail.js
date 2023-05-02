import React, { useEffect, useState } from "react";
import FormPage from "../../UI/FormPage";
import { Form, Input, App, DatePicker, Image, Row, Col, Alert, Button } from "antd";
import axios from "./../../../../api";
import { maskCpf, maskDate, maskPhone } from "../../../../utils/masks";
import FindUnity from "../../../Components/Common/FindUnity";
import FindPeopleType from "../../../Components/Common/FindPeopleType";
import { cpfValid } from "../../../../utils/formValidations";
import UploadImage from "../../../Components/UploadImage";


export default function PeopleDetail() {
  const [data, setData] = useState({ active: true });
  const [unity, setUnity] = useState({});
  const { notification } = App.useApp();


  const isCpfValid = cpfValid;
  const [form] = Form.useForm();


  const getData = () => {
    const id = window.location.pathname.split('/').slice(-1)[0];

    if (id != 'new') {
      axios.get(`people/${id}`, {
        params: {
          concierge: true
        }
      })
        .then(setData)
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
    axios.post(`people`, { ...formData, _id })
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

  const validatorCpf = (_, cpf) => {
    if (!isCpfValid(cpf)) {
      return Promise.reject(new Error('Por favor preencha um CPF válido!'));
    }

    return Promise.resolve();
  }

  return (
    <FormPage title={'Cadastro de Pessoa'} data={data} onSubmit={submit} cardHeight={'76vh'} form={form}>
      <Form.Item
        name="unityId"
        id="unityId"
        label="Unidade / Morador"
        rules={[{ required: true, message: 'Unidade obrigatória' }]}
      >
        <FindUnity
          onUnityChange={setUnity}
        />
      </Form.Item>

      <Form.Item
        name="cpf"
        id="cpf"
        label="CPF"
        rules={[{
          validator: validatorCpf,
        }]}
      >
        <Input
          placeholder="Preencha o cpf"
          // prefix={<SearchOutlined />}
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
        <Input
          placeholder="Preencha o nome"
          allowClear
          onChange={(e) => {
            form.setFieldValue('name', e.target.value.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()));
          }}
        />
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
        <FindPeopleType />
      </Form.Item>

      <Form.Item
        name="peoplePics"
        id="peoplePics"
        label="Imagem"
      >
        <UploadImage />
      </Form.Item>

    </FormPage>
  )
}