import { Avatar, Col, List, Row } from 'antd';
const data = [
  {
    name: 'Karina Hirato',
    peopleType: 'Morador',
    gate: 'Portão 1',
    pic: 'https://i.pinimg.com/236x/0d/99/03/0d9903298afb11f16e6bd1f514d07ab7--asian-makeup-eye-makeup.jpg'
  },
  {
    name: 'Alberto Costa',
    peopleType: 'Visitante',
    gate: 'Entrada Pedestre',
    pic: 'https://img.freepik.com/fotos-gratis/retrato-de-homem-branco-isolado_53876-40306.jpg?w=996&t=st=1682775008~exp=1682775608~hmac=f55dd97e6a0211cd532f585e51bbfe7cc40ff771d80f120dc568134cc4295ab7'
  },
  {
    name: 'Juliana Moraes',
    peopleType: 'Morador',
    gate: 'Portão 2',
    pic: 'https://static.vecteezy.com/ti/fotos-gratis/t2/1852282-retrato-de-uma-mulher-sorridente-foto.jpg'
  },
  {
    name: 'Rosana Goes',
    peopleType: 'Morador',
    gate: 'Portão 2',
    pic: 'https://static.vecteezy.com/ti/fotos-gratis/t2/3492047-closeup-retrato-de-uma-garota-charmosa-sobre-a-imagem-de-fundo-de-estudio-azul-gratis-foto.jpg'
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
              <Avatar src={item.pic} />
            </Col>
            <Col flex={'auto'}>
              <Row>
                <p style={{ margin: 0 }}><b>{item.name}</b> ({item.peopleType})</p>
              </Row>
              <Row>
                <p style={{ margin: 0 }}>{item.gate} - {new Date().toLocaleString()}</p>
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