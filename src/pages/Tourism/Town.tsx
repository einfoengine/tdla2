import { PageContainer } from '@ant-design/pro-components';
import { Card, Row, Col, Form, Button, Input, Table, Tag, Modal } from 'antd';
import React, {useState, useEffect} from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';


import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';

import * as dotenv from 'dotenv';
import CreatEntryModal from '@/components/CreatEntryModal';
dotenv.config();


interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
  id: any;
  entry: object;
}

const {Search} = Input;

// =================

const createApi = "/api/v1/tourism/town/";


const Welcome: React.FC = () => {
  
  const [state, setState] = useState();
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [selected, setSelected] = useState();
  const [entry, setEntry] = useState({})

  

  const requestCreate = async () => {
    const response = await axios.post('https://backend.letourdelangkawi.com/api/v1/tourism/town/',{
          name: entry.name,
          desc: entry.desc,
          is_active: entry.state,
          cover_image: entry.cover
    },{
      headers: {
        authorization: "Token a011224cb2ca4039f777405d0722bc0ae40be218"
      }
    });
    setState(response.data.data.results);
  }
  const requestGet = async () => {
    const response = await axios.get('https://backend.letourdelangkawi.com/api/v1/tourism/town/', {
      headers: {
        authorization: 'Token a011224cb2ca4039f777405d0722bc0ae40be218',
      }
    });
    setState(response.data.data.results);
  }

  const requestEdit = async (recordId: string) => {
    const response = await axios.get(`https://backend.letourdelangkawi.com/api/v1/tourism/town/${recordId}`, {
      headers: {
        authorization: 'Token a011224cb2ca4039f777405d0722bc0ae40be218',
      }
    });
    setEntry(response.data);
    console.log('Selected item -',response.data.data);
    // const requestEdit = await axios.put(`https://backend.letourdelangkawi.com/api/v1/tourism/heritage/${recordId}`,{
    //     name: entry.name,
    //     desc: entry.desc,
    //     is_active: entry.state,
    //     cover_image: entry.cover
    // },{
    //   headers: {
    //     authorization: "Token a011224cb2ca4039f777405d0722bc0ae40be218"
    //   }
    // });
    // setState(response.data.data.results);
  }
  
  const requestDelete = async (recordId: string) => {
    await axios.delete(`https://backend.letourdelangkawi.com/api/v1/tourism/town/${recordId}`,{
      headers: {
        authorization: "Token a011224cb2ca4039f777405d0722bc0ae40be218"
      }
    });
    const response = await axios.get(`https://backend.letourdelangkawi.com/api/v1/tourism/town/`);
    setState(response.data.data.results);
  }

  const data: any = state;

  const showModalDelete = () => {
    setIsModalDeleteOpen(true);
  };
  const showModalEdit = () => {
    setIsModalEditOpen(true);
  };

  const handleDeleteOk = () => {
    requestDelete(selected);
    setIsModalDeleteOpen(false);
  };

  const handleDeleteCancel = () => {
    setIsModalDeleteOpen(false);
  };
  const handleEditOk = () => {
    setIsModalEditOpen(false);
  };

  const handleEditCancel = () => {
    setIsModalEditOpen(false);
  };

  // const handleSubmit = (values: any) => {
  //   console.log('Success:', values);
  // };

  // const handleFailed = (errorInfo: any) => {
  //   console.log('Failed:', errorInfo);
  // };

  useEffect(() => {
    requestGet();
  },[]);
  useEffect(()=>{
    // setEntry();
  },[]);


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
      render: (_,  record) => {
        console.log('Params-- ', record?.id);
        return(
          <div style={{textAlign: 'center'}}>
            <Modal title="Delete Entry" open={isModalDeleteOpen} onOk={handleDeleteOk} onCancel={handleDeleteCancel}>
              <p>This action will delete your entry. Are you sure?</p>
            </Modal>
            <Modal title="Edit Entry" open={isModalEditOpen} onOk={handleEditOk} onCancel={handleEditCancel}>
              <Form
                name="EditEntry"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 16 }}
                // onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                // autoComplete="off"
              >
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[{ message: 'Name of the town' }]}
                >
                  <Input onChange={(e: any) => {

                  }} />
                </Form.Item>
                <Form.Item
                  label="Description"
                  name="description"
                  rules={[{ message: 'Description' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="IsActive"
                  name="Active"
                  rules={[{ message: 'Active or inactive' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="CoverImage"
                  name="Cover Image"
                  rules={[{ message: 'Cover Image' }]}
                >
                  <Input />
                </Form.Item>
                {/* <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item> */}
              </Form>
            </Modal>
            <a style={{marginRight: '20px'}} onClick={(e: any)=>{
              showModalDelete();
              setSelected(record.id);
              console.log('Click - ', e, 'Param - ',record.id);
              }}>
                <DeleteOutlined style={{color: "red"}} />
            </a>
            <a style={{marginRight: '20px'}} onClick={(e: any)=>{
              showModalEdit();
              setSelected(record.id);
              requestEdit(record.id);
              console.log('Click - ', e, 'Param - ',record.id);
            }}>
              <EditOutlined />
            </a>
          </div>
        )
      }
    },
  ];
  
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
                {/* <Button style={{marginLeft: 16}} onClick={()=>{console.log("hi")}}>Create</Button> */}
                <CreatEntryModal buttonText="Create" modalName="Create Town" requestUrl=""/>
              </Col>
            </Row>
            <Row>
              <Table columns={columns} dataSource={data} bordered style={{width: '100%'}} />
            </Row>
        </Card>   
    </PageContainer>
  );
};

export default Welcome;
