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
  const { title, children, onSubmit = () => { }, data = {} } = props;

  const [form] = Form.useForm();


  useEffect(() => {
    form.setFieldsValue(data)
  }, [data])

  return (
    <Row justify={'center'}>

      <Col xs={24} sm={12}>
        <Card>
          <Title level={3} style={{ margin: 0, paddingLeft: 5 }}>{title}</Title>
          <Divider />

          <Row justify={'center'}>
            <Form
              name="validate_other"
              form={form}
              onFinish={onSubmit}

              labelCol={{
                span: 4,
              }}
              style={{
                minWidth: 410
              }}
            >
              {children}
              <Form.Item
                wrapperCol={{
                  offset: 4,
                }}
              >
                <Button 
                  type="primary" 
                  htmlType="submit"
                >
                  Salvar
                </Button>
                <Button 
                  style={{marginLeft: 10}}
                  onClick={() => {
                    history.go(-1)
                  }}
                >
                  Cancelar
                </Button>
              </Form.Item>
            </Form>
          </Row>

        </Card>
      </Col>
    </Row >
  )
};
