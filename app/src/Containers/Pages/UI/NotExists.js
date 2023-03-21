import { Button, Col, Result, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import TopNavigation from './TopNavigation';
const NotExists = () => {
  const navigate = useNavigate();
  return (
    <Row>
      <Col xs={24}>
        <TopNavigation />
        <Result
          status="404"
          title="404"
          subTitle="Desculpe, esta página ainda não está disponível. Tente novamente depois."
          extra={<Button type="primary" onClick={() => { navigate('/') }}>Voltar para o Início</Button>}
        />

      </Col>
    </Row>
  )
}
export default NotExists;