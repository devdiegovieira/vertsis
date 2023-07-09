import React, { useEffect, useState } from "react";
import FormPage from "../../UI/FormPage";
import { Form, Input, App, DatePicker, Image, Row, Col, Alert, Button, Switch, Space, Typography, Divider } from "antd";
import axios from "./../../../../api";
import { maskCpf, maskDate, maskPhone } from "../../../../utils/masks";
import FindUnity from "../../../Components/Common/FindUnity";
import FindPeopleType from "../../../Components/Common/FindPeopleType";
import { cpfValid } from "../../../../utils/formValidations";
import UploadImage from "../../../Components/UploadImage";
import dayjs from "dayjs";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";


export default function PeopleDetail() {
  const [data, setData] = useState({ active: true });
  const [unity, setUnity] = useState({});
  const { notification } = App.useApp();
  const { Title } = Typography;



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
        .then((data) => {
          data.expDate = dayjs(data.expDate);
          data.birthDate = dayjs(data.birthDate);
          setData(data)
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
        name="cpf"
        id="cpf"
        label="CPF"
        rules={[{
          required: true,
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
        name="rg"
        id="rg"
        label="RG"
      >
        <Input
          placeholder="Preencha o RG"
          allowClear
        />
      </Form.Item>

      <Form.Item
        name="expDate"
        id="expDate"
        label="Data de Expedição"
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

      <Divider />
      <Form.List
        name="units"
        rules={[
          {
            validator: async (_, units) => {
              if (!units || units.length < 1) {
                return Promise.reject(new Error('Necessário inserir pelo menos uma unidade / tipo de acesso'));
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{
                  display: 'flex',
                  marginLeft: 145
                }}
                align="baseline"
              >
                <Form.Item
                  name={[name, 'unityId']}
                  id="unityId"
                  rules={[{ required: true, message: 'Unidade obrigatória' }]}
                  style={{minWidth: 160}}
                  {...restField}
                >
                  <FindUnity
                    autoFocus
                    placeholder={'Unidade'}
                    onUnityChange={setUnity}
                  />
                </Form.Item>

                <Form.Item
                  id="accessTypeId"
                  name={[name, 'accessTypeId']}
                  // label="Tipo de Acesso"
                  rules={[{ required: true, message: 'Tipo de acesso obrigatório' }]}
                  style={{minWidth: 160}}
                  {...restField}
                >
                  {/* <FindPeopleType /> */}
                  <FindPeopleType
                    placeholder={'Tipo de Acesso'}
                  />
                </Form.Item>

                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item
              wrapperCol={{
                offset: 7,
              }}
            >
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Adicionar Unidade / Tipo de Acesso
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>

          </>
        )}
      </Form.List>
      <Divider />


      <Form.Item
        name="peoplePics"
        id="peoplePics"
        label="Imagens"
      >
        <UploadImage />
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