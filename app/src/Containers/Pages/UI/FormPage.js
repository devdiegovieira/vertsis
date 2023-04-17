import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Row,
  Typography,
} from 'antd';
import { useEffect } from 'react';

const { Title } = Typography;
export default function FormPage(props) {
  const { title, children, onSubmit = () => { }, data = {}, clear = false } = props;

  const [form] = Form.useForm();


  useEffect(() => {
    form.setFieldsValue(data)
  }, [data])

  return (
    <Row justify={'center'}>

      <Col xs={24}  >
        <Card>
          <Title level={3} style={{ margin: 0, paddingLeft: 5 }}>{title}</Title>
          <Divider />

          <Row justify={'center'}>
            <Form
              name="validate_other"
              form={form}
              onFinish={onSubmit}

              labelCol={{
                span: 8,
              }}
              style={{
                minWidth: 500
              }}
            >
              {children}
              <Form.Item
                wrapperCol={{
                  offset: 8,
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                >
                  Salvar
                </Button>
                <Button
                  style={{ marginLeft: 10 }}
                  onClick={() => {
                    if (clear)
                      form.resetFields();
                    else
                      history.go(-1)
                  }}
                >
                  {clear ? 'Limpar' : 'Cancelar'}
                </Button>
              </Form.Item>
            </Form>
          </Row>

        </Card>
      </Col>
    </Row >
  )
};
