import { ArrowRightOutlined  } from '@ant-design/icons';
import {  Card as AntCard } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Meta } = AntCard;

function Card(props) {
  const {
    title = '',
    description = '',
    icon,
    path = ''
  } = props;

  const navigate = useNavigate();

  return (
    <AntCard
      style={{
        width: 300,
      }}
      // cover={
      //   <img
      //     alt="example"
      //     src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      //   />
      // }
      actions={[
        <div onClick={() => {navigate(path)}}>Acessar <ArrowRightOutlined key="visit" /></div>,
      ]}
    >
      <Meta
        avatar={icon}
        title={title}
        description={description}
        style={{minHeight: 120}}
      />
    </AntCard>

  )
};


export default Card;