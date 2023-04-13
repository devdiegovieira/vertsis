import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Form, Input, Row, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { mailValid } from '../../../utils/formValidations';
import logo from './../../Img/vertsislogo.png';
import axios from './../../../api';
import SHA256 from 'crypto-js/sha256';
import { App } from 'antd';


const Login = () => {
  const isValidMail = mailValid;
  const navigate = useNavigate();

  const { notification} = App.useApp();


  const onFinish = (values) => {
    values.password = SHA256(values.password).toString();

    axios.post('auth/login', values)
      .then(user => {
        localStorage.setItem('user', JSON.stringify(user))
        navigate('/')   
      })
      .catch((err) => {
        notification.open({
          message: `Erro`,
          description: err,
          type: 'error',
          placement: 'topRight',
        });
      })
  };
  return (
    <Row justify={'center'} align={'middle'} style={{height:window.innerHeight - 100}} >
      <Col xs={24} style={{ maxWidth: 400, padding: 10 }}>
        <Row justify={'center'} >
          <Col>
            <img src={logo} height={90} style={{  marginBottom: 50 }} />
          </Col>

          <Col xs={24}>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              
            >
              <Form.Item
                name="mail"
                rules={[{
                  validator: (_, mail) => {
                    if (isValidMail(mail)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Por favor preencha um email válido!'));
                  },
                }]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="E-mail" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Preencha sua senha!',
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Senha"
                />
              </Form.Item>
              <Form.Item>
                <Row justify={'space-between'}>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Lembre-me</Checkbox>
                  </Form.Item>

                  {/* <a className="login-form-forgot" href="">
                    Estqueceu a senha?
                  </a> */}

                </Row>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" style={{ marginRight: 10 }}>
                  Entrar
                </Button>
                {/* ou <a href="" style={{ marginLeft: 10 }}>Registrar Agora!</a> */}
              </Form.Item>
            </Form>
          </Col>
        </Row>




      </Col>
    </Row>

  );
};

export default Login; 