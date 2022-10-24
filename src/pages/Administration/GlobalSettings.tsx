import React, {useState, useEffect} from 'react';
import { PageContainer } from '@ant-design/pro-components';
// import { Card, Breadcrumb, Row, Col, Button, Input, Table, Tag } from 'antd';
import { Card, Breadcrumb, Row, Col, Button, Form, Input, Upload, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';


// import type { ColumnsType } from 'antd/es/table';
// import axios from 'axios';

const {TextArea} = Input;



const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
  
const Player: React.FC = () => {
    // const [state, setState] = useState();
  
    // useEffect(() => {
    //   const getAxios = async () => {
    //     const axiorRequest = await axios.get('https://backend.letourdelangkawi.com/api/v1/race-center/admin/result/', {
    //       headers: {authorization: "token a011224cb2ca4039f777405d0722bc0ae40be218"}
    //     });
    //     setState(axiorRequest.data.data.results);
    //     return axiorRequest;
    //   }
    //   getAxios();
    // },[]);

    // const data: any = state;

    const [form] = Form.useForm();
  
    const onFinish = (values: any) => {
      console.log(values);
    };
  
    const onReset = () => {
      form.resetFields();
    };
  
    const onFill = () => {
      form.setFieldsValue({
        note: 'Hello world!',
        gender: 'male',
      });
    };

    const normFile = (e: any) => {
      console.log('Upload event:', e);
      if (Array.isArray(e)) {
        return e;
      }
      return e?.fileList;
    };

    return (
      <PageContainer>
        {/* {console.log("|| Slider State ******> ", state)} */}
        <Card>
            
              
              <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} style={{width:'75%'}}>
                <Form.Item name="siteName" label="Site Name" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="url" label="Url" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item
                  name="uploadLogo"
                  label="Upload Logo"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  extra="Upload from your local machine"
                >
                  <Upload name="logo" action="/upload.do" listType="picture">
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                  </Upload>
                </Form.Item>
                <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email',  required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item
                  name="phone"
                  label="Phone Number"
                  rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                  <Input addonBefore={"+60"} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item name="address" label="Address">
                  <Input/>
                </Form.Item>
                <Form.Item name="description" label="Short description">
                  <TextArea rows={4} />
                </Form.Item>
                <Form.Item name="facebook" label="Facebook">
                  <Input/>
                </Form.Item>
                <Form.Item name="twitter" label="Twitter">
                  <Input/>
                </Form.Item>

                <Form.Item {...tailLayout}>
                  <Space>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                  <Button htmlType="button" onClick={onReset}>
                    Reset
                  </Button>
                  </Space>
                </Form.Item>
              </Form>
            
        </Card>   
      </PageContainer>
    );
};
export default Player;
