import { Col, Row, Card, Typography, Button, Input, Tooltip, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined, ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import Table from "../../Components/Table";
import { useDebounce, useUrlParams } from "../../../utils/hooks";
import { useNavigate, useSearchParams } from "react-router-dom";
import PropTypes, { object } from 'prop-types';
import SwitchPage from "./SwitchPage";

const { Title } = Typography;

function List(props) {
  const {
    title,
    getData = () => { },
    data = [],
    loading = false,
    columns = [],
    onDelete = () => { },
    resource = '',
    resourceId = '',
    showNew = true,
    detail = <></>,
    pageSize = 50,
  } = props;

  const [params, setParams] = useSearchParams();


  const urlParams = useUrlParams(window.location.search)
  if (urlParams) {
    urlParams.offset = Number(urlParams.offset)
    urlParams.limit = Number(urlParams.limit)
  }

  const [filter, setFilter] = useState({
    search: '',
    offset: 0,
    limit: pageSize,
    ...urlParams
  });

  const debounce = useDebounce(getData)

  useEffect(() => {
    setParams(filter)
    debounce(filter)
  }, [filter])

  const pageChange = (page, size) => {
    setFilter({ ...filter, offset: (page - 1) * size, limit: size })
  }

  const navigate = useNavigate();

  return (
    <Row gutter={[15, 15]}>
      <Col>
        <Title level={3} style={{ margin: 0, paddingLeft: 5 }}>{title}</Title>
      </Col>

      <Col xs={24}>
        <Card bodyStyle={{ padding: 10 }}>
          <Row gutter={[10, 10]} justify={'end'}>
            <Input
              placeholder="O que você está procurando hoje?"
              autoFocus
              allowClear
              prefix={<SearchOutlined />}
              value={filter.search}
              onChange={(e) => {
                setFilter({ ...filter, search: e.target.value })
              }}
              style={{ maxWidth: 300 }}
            />
            <Col flex={'none'}>
              <Button
                type="text"
                shape="circle"
                icon={<ReloadOutlined />}
                onClick={() => { getData(filter) }}
              />
            </Col>
            {
              showNew &&
              <Col flex={'none'}>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    navigate(`${resource}/new`)
                  }}
                >
                  Adicionar
                </Button>
              </Col>
            }
          </Row>

        </Card>
      </Col>

      <Col xs={24} >
        <Table
          pageSize={filter.limit}
          pageChange={pageChange}
          data={data}
          loading={loading}
          columns={[
            ...columns,
            {
              title: 'Ações',
              dataIndex: '',
              fixed: 'right',
              width: 150,
              align: 'center',
              render: (row) => {
                return (
                  <>
                    {
                      detail &&
                      <Tooltip title={'Editar'} placement="bottom">
                        <Button
                          type="text"
                          shape="circle"
                          icon={<EditOutlined />}
                          onClick={() => {
                            navigate(`${resource}/${row[resourceId]}`)
                          }}
                        />
                      </Tooltip>
                    }
                    {
                      onDelete &&
                      <Tooltip title={'Deletar'} placement="bottom" >
                        <Popconfirm
                          placement="topRight"
                          title={'Deseja mesmo apagar este registro?'}
                          description={'Deletar registro'}
                          onConfirm={() => {
                            onDelete(row)
                          }}
                          okText="Sim"
                          cancelText="Não"
                        >
                          <Button
                            type="text"
                            shape="circle"
                            icon={<DeleteOutlined style={{ color: 'red' }} />}
                          />
                        </Popconfirm>
                      </Tooltip>
                    }
                  </>
                )
              },
            },
          ]}
        />
      </Col>
    </Row>
  )

}



function CrudPage(props) {
  const {
    resource = '',
    detail = <></>
  } = props;


  return (
    <SwitchPage
      resource={resource}
      list={<List {...props}/>}
      detail={detail}
    />
  )
}


// ListPage.propTypes = {
//   title: PropTypes.string.isRequired,
//   getData: PropTypes.func.isRequired,
//   data: PropTypes.arrayOf(object).isRequired,
//   loading: PropTypes.bool.isRequired,
//   columns: PropTypes.arrayOf(object).isRequired,
//   actions: PropTypes.object.isRequired,
//   pageSize: PropTypes.number.isRequired,
// };

export default CrudPage