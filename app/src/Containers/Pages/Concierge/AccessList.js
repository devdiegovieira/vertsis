import { Avatar, Col, List, Row } from 'antd';
const data = [
  {
    name: 'Diego Vieira',
    peopleType: 'Morador'
  },
  {
    name: 'Carlos Roberto',
    peopleType: 'Visitante'
  },
  {
    name: 'Giulia Vieira',
    peopleType: 'Morador'
  },
  {
    name: 'Stefanie Almeida',
    peopleType: 'Morador'
  },
];

export default function AccessList() {
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item, index) => (
        <List.Item>
          <Row align={'middle'}>
            <Col flex={'none'}>
              <Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />
            </Col>
            <Col flex={'auto'}>
              <Row>
                <p style={{ margin: 0 }}><b>{item.name}</b> ({item.peopleType})</p>
              </Row>
              <Row>
                <p style={{ margin: 0 }}>{new Date().toLocaleString()}</p>
              </Row>
            </Col>
          </Row>

          {/* <List.Item.Meta
            avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
            title={<a href="https://ant.design">{item.title}</a>}
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          /> */}
        </List.Item>
      )}
    />
  )
};