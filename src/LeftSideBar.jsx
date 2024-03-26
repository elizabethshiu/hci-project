import React, { useState, useEffect } from 'react';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Layout, Modal, Form, theme, Input, Menu, Button} from 'antd';
import './app.css'; // Import CSS file

let activeKey = 0;
let count = 1;
let folderName = "";

const leftSidebarItems = [
    {
      label: "My Library",
      key: "0",
      children: [
        {
          label: "Add Folder",
          key: "0addFolder",
          icon: <PlusOutlined />,
          onClick: () => {
            console.log(leftSidebarItems[0].children);
          }
        },
        {
          label: "My Publications",
          key: "0publications"
        },
        {
          label: "Duplicate Items",
          key: "0duplicates"
        },
        {
          label: "Unfiled Items",
          key: "0unfiled"
        },
        {
          label: "Trash",
          key: "0trash",
          icon: <DeleteOutlined />,
          onClick: () => {
            console.log('clicked library')
          }
        }
      ],
      onClick: () => {
        activeKey = leftSidebarItems[0].key;
      } 
    }
  ];

function LeftSideBar(){
    const [leftNavBar, setLeftNavBar] = useState(leftSidebarItems);
    const [modalAddFolder, setModalAddFolder] = useState(false);
    const [folderForm] = Form.useForm();
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
    return (
                <Layout.Sider
                    collapsible= "true"
                    collapsedWidth={115}
                    width={200}
                    style={{
                        background: colorBgContainer,
                    }}
                >
                <Button 
                    block="true" 
                    type="primary"  
                    style={{ backgroundColor: '#2596be' }} 
                    onClick={() => setModalAddFolder(true)}
                    > 
                    Add Folder <PlusOutlined/> 
                </Button>
                <Modal
                    title="Add Folder"
                    centered = "true"
                    open={modalAddFolder}
                    onCancel={() => {
                    folderForm.resetFields();
                    setModalAddFolder(false);
                    }}
                    footer={[]}
                >
                    <Form
                    form={folderForm}
                    onFinish={() => {
                        let keyVal = count;
                        folderName = folderForm.getFieldValue("folderName");
                        folderForm.resetFields();
                        setModalAddFolder(false);
                        leftSidebarItems.push({
                        label: folderName,
                        key: count,
                        children: [
                            {
                            label: "Add Folder",
                            key: count + "addFolder",
                            icon: <PlusOutlined />,
                            onClick: () => {
                                console.log('clicked library')
                            }
                            },
                            {
                            label: "My Publications",
                            key:  count + "publications"
                            },
                            {
                            label: "Duplicate Items",
                            key: count +"duplicates"
                            },
                            {
                            label: "Unfiled Items",
                            key: count + "unfiled"
                            },
                            {
                            label: "Trash",
                            key: count + "trash",
                            icon: <DeleteOutlined />,
                            onClick: () => {
                                console.log('clicked library')
                            }
                            }
                        ],
                        onClick: () => {
                            activeKey = keyVal;
                        }  
                        })
                        count++;
                        let temp = leftSidebarItems.slice();
                        setLeftNavBar(temp);
                    }}  
                    >
                    <Form.Item
                        name = "folderName"
                        rules={[
                        {
                            required: true,
                            message: 'Please input a Folder Name!',
                        },
                        ]}
                    >
                    <Input placeholder='Enter a Folder Name'></Input>
                    </Form.Item>
                    <Form.Item 
                        name="submitFolderName"
                    >
                        <Button key="submit" type="primary"  htmlType="submit">
                        Submit
                        </Button> 
                    </Form.Item>
                    </Form>
                </Modal>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['library']}
                    style={{
                    height: '100%',
                    borderRight: 0,
                    }}
                    items={leftNavBar}
                />
                </Layout.Sider>
    )
}

export default LeftSideBar;