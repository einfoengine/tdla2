import { PageContainer } from '@ant-design/pro-components';
import { Card, Row, Col, Button, Input, Table, Tag } from 'antd';
import React, {useState, useEffect} from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const {Search} = Input;

// =================
const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      key: 'id',
      dataIndex: 'id',
      render: (id) => {return <a>{id}</a>},
    },
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: 'Active',
      key: 'is_active',
      dataIndex: 'is_active',
      // render: (status) => status===true? <span>{'Active'}</span> : <span>hello</span>,
      render: (status) => status===true? <Tag color="green">Active</Tag> : <span>Inactive</span>,
    },
    {
      title: 'Create at',
      key: 'created_at',
      dataIndex: 'created_at',
    },
    {
      title: 'Operation',
      key: 'operation',
      dataIndex: 'operationn',
      render: () => <div style={{textAlign: 'center'}}><a style={{marginRight: '20px'}}><DeleteOutlined style={{color: "red"}} /></a><a><EditOutlined /></a></div>
    },
  ];
  
  const Road: React.FC = () => {
  const [towns, setTowns] = useState();
  
  useEffect(() => {
    const getTown = async () => {
      const townRequest = await axios.get('https://backend.letourdelangkawi.com/api/v1/tourism/road/');
      setTowns(townRequest.data.data.results);
    //   return towns;
    }
    getTown();
    
  },[]);

  const data: any = towns;
  return (
    <PageContainer>
        <Card>
            <Row>
              <Col span={12}>
                <Search
                  placeholder="input search text"
                  style={{ width: 200, marginBottom: 16 }}
                  onSearch={value => console.log(value)}
                />
              </Col>
              <Col span={12} style={{textAlign: 'right'}}>
                <Button style={{marginLeft: 16}}>Reset</Button>
                <Button style={{marginLeft: 16}}>Create</Button>
              </Col>
            </Row>
            <Row>
              <Table columns={columns} dataSource={data} bordered style={{width: '100%'}} />
            </Row>
        </Card>   
    </PageContainer>
  );
};

export default Road;
