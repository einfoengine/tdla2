import { Button, Modal, Form, Input } from 'antd';
import React, { useState } from 'react';
import axios from 'axios';

const CreatEntryModal: React.FC = ({modalName, buttonText, requestUrl, }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createData, setCreateData] = useState({});
  const baseUrl = "https://backend.letourdelangkawi.com";

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    console.log(baseUrl+requestUrl);
    // console.log(createData);
    // try {
    //   const res = await axios.post("https://backend.letourdelangkawi.com"+requestUrl, createData, {headers:{
    //     authorization: 'Token a011224cb2ca4039f777405d0722bc0ae40be218'
    //   }})
    //   console.log(res);
    // } catch (error) {
    //   console.log(error)
    // }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // console.log(process.env.S3_BUCKET);
  console.log(createData);
  return (
    <>
      <Button onClick={showModal}>
        {buttonText}
      </Button>
      <Modal title={modalName } open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Form
                name="EditEntry"
                labelCol={{ span: 5 }}
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
                  <Input onChange={(e) => {
                    // setCreateData((previousState)=>{
                    //   console.log(createData)
                    //   return{
                    //     ...previousState, name: e.target.value
                    //   }
                    // })
                    setCreateData({...createData, name: e.target.value});
                    // console.log(createData);
                  }} />
                </Form.Item>
                <Form.Item
                  label="Description"
                  name="description"
                  rules={[{ message: 'Description' }]}
                >
                  <Input onChange={(e) => {
                    setCreateData((previousState)=>{
                      return{
                        ...previousState, name: e.target.value
                      }
                    })
                  }} />
                </Form.Item>
                <Form.Item
                  label="Is Active"
                  name="Active"
                  rules={[{ message: 'Active or inactive' }]}
                >
                  <Input onChange={(e) => {
                    setCreateData((previousState)=>{
                      return{
                        ...previousState, name: e.target.value
                      }
                    })
                  }} />
                </Form.Item>
                <Form.Item
                  label="Cover Image"
                  name="CoverImage"
                  rules={[{ message: 'Cover Image' }]}
                >
                  <Input onChange={(e) => {
                    setCreateData((previousState)=>{
                      return{
                        ...previousState, name: e.target.value
                      }
                    })
                  }} />
                </Form.Item>
                {/* <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item> */}
              </Form>
      </Modal>
    </>
  );
};

export default CreatEntryModal;