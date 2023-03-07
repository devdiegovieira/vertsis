import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
const NotExists = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Desculpe, esta página ainda não está disponível. Tente novamente depois."
      extra={<Button type="primary" onClick={() => { navigate('/') }}>Voltar para o Início</Button>}
    />
  )
}
export default NotExists;