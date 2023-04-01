import { Col, Row, Table as AntTable } from 'antd';

const Table = (props) => {
  const { 
    loading = false, 
    columns = [], 
    data = [], 
    pageSize = 50, 
    pageChange = () => {} 
  } = props;

  return (
    <Row>
      <Col xs={24} style={{padding:2}}>
        <AntTable
          loading={loading}
          pagination={{
            showSizeChanger: true,
            defaultPageSize: pageSize,
            showQuickJumper: true,
            position: ['bottomRight'],
            onChange: pageChange
          }}
          columns={columns}
          dataSource={data}
          scroll={ data.length ? { y: '56vh' } : {} }    
        />
      </Col>
    </Row>
  );
};
export default Table;