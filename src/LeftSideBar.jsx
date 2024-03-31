import React, { useState, useEffect, useContext } from 'react';
import { DeleteOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Layout, Modal, Form, theme, Input, Menu, Button } from 'antd';
import './app.css'; // Import CSS file
import { ManagerContext } from './App';

let leftSidebarItems = []
let activeKey = -1;
let childKey = -1;
let count = 0;
let childrenCount = 0;
let folderName = "";

function LeftSideBar() {
    const [leftNavBar, setLeftNavBar] = useState(leftSidebarItems);
    const [modalAddFolder, setModalAddFolder] = useState(false);
    const [modalAddDocFolder, setModalAddDocFolder] = useState(false);
    const [modalDeleteFolder, setModalDeleteFolder] = useState(false);
    const [folderForm] = Form.useForm();
    const [folderDocForm] = Form.useForm();
    const data = useContext(ManagerContext);

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();



    return (
        <Layout.Sider
            collapsible="true"
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
                Add Folder <PlusOutlined />
            </Button>
            <Modal
                title="Add Folder"
                centered="true"
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
                        leftSidebarItems.unshift({
                            label: folderName,
                            key: count,
                            children: [
                                {
                                    label: "Add Sub-Folder",
                                    key: count + "addFolder",
                                    icon: <PlusOutlined />,
                                    onClick: () => {
                                        setModalAddDocFolder(true);
                                    }
                                },
                                {
                                    label: "My Publications",
                                    key: count + "publications",
                                    onClick: () => {
                                        activeKey = keyVal;
                                        childKey = keyVal + "publications";
                                        let index = leftSidebarItems.findIndex((data) => {
                                            return data.key == activeKey;
                                        })                                           
                                        let temp = leftSidebarItems[index].data.filter((data) => {
                                            return data.parentKey == childKey;
                                        })
                                        data.setDataSource(temp);
                                    }
                                },
                                {
                                    label: "Duplicate Items",
                                    key: count + "duplicates",
                                    onClick: () => {
                                        activeKey = keyVal;
                                        childKey = keyVal + "duplicates";
                                        let index = leftSidebarItems.findIndex((data) => {
                                            return data.key == activeKey;
                                        })   
                                        let temp = leftSidebarItems[index].data.filter((data) => {
                                            return data.parentKey == childKey;
                                        })
                                        data.setDataSource(temp);
                                    }
                                },
                                {
                                    label: "Unfiled Items",
                                    key: count + "unfiled",
                                    onClick: () => {
                                        activeKey = keyVal;
                                        childKey = keyVal + "unfiled";
                                        let index = leftSidebarItems.findIndex((data) => {
                                            return data.key == activeKey;
                                        })                                          
                                        let temp = leftSidebarItems[index].data.filter((data) => {
                                            return data.parentKey == childKey;
                                        })
                                        data.setDataSource(temp);
                                    }
                                },
                                {
                                    label: "Trash",
                                    key: count + "trash",
                                    icon: <DeleteOutlined />,
                                    onClick: () => {
                                        activeKey = keyVal;
                                        childKey = keyVal + "trash";
                                        let index = leftSidebarItems.findIndex((data) => {
                                            return data.key == activeKey;
                                        })   
                                        console.log(leftSidebarItems);
                                        console.log(activeKey);
                                        let temp = leftSidebarItems[index].data.filter((data) => {
                                            return data.parentKey == childKey;
                                        })
                                        data.setDataSource(temp);
                                    }
                                },
                                {
                                    label: "Delete Folder",
                                    key: count + "delete",
                                    icon: <CloseOutlined/>,
                                    onClick: () => {
                                        activeKey = keyVal;
                                        childKey = -1;
                                        let index = leftSidebarItems.findIndex((data) => {
                                            return data.key == activeKey;
                                        })                                      
                                        setModalDeleteFolder(true);
                                        let temp = leftSidebarItems[index].data.filter((data) => {
                                            return data.parentKey == childKey;
                                        })
                                        console.log(temp);
                                        data.setDataSource(temp);
                                        data.checkDisabled()
                                    }
                                }
                            ],
                            data: [],
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
                        name="folderName"
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
                        <Button key="submit" type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Add Document Folder"
                centered="true"
                open={modalAddDocFolder}
                onCancel={() => {
                    folderDocForm.resetFields();
                    setModalAddDocFolder(false);
                }}
                footer={[]}
            >
                <Form
                    form={folderDocForm}
                    onFinish={() => {
                        folderName = folderDocForm.getFieldValue("folderDocName");
                        folderDocForm.resetFields();
                        setModalAddDocFolder(false);

                        let index = leftSidebarItems.findIndex(function (folder) {
                            return folder.key == activeKey;
                        });
                        let keyChild = leftSidebarItems[index].children.length + folderName;
                        leftSidebarItems[index].children.unshift({
                            label: folderName,
                            key: childrenCount + folderName,
                            onClick: () => {
                                childKey = keyChild;
                                let index = leftSidebarItems.findIndex((data) => {
                                    return data.key == activeKey;
                                })   
                                let temp = leftSidebarItems[index].data.filter((data) => {
                                    return data.parentKey == childKey;
                                })
                                data.setDataSource(temp);
                            }
                        });
                        childrenCount++;
                        let temp = leftSidebarItems.slice();
                        setLeftNavBar(temp);
                    }}
                >
                    <Form.Item
                        name="folderDocName"
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
                        <Button key="submit" type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Confirm Deletion of Folder"
                centered="true"
                open={modalDeleteFolder}
                onCancel={() => {
                    setModalDeleteFolder(false);
                }}
                onOk={() =>{
                    let removeIndex = leftSidebarItems.findIndex((data) => {
                        return data.key == activeKey;
                    })
                    console.log(leftSidebarItems);
                    leftSidebarItems.splice(removeIndex,1);
                    let temp = leftSidebarItems.slice();
                    setModalDeleteFolder(false);
                    setLeftNavBar(temp);
                    data.setDataSource([])
                }}
            >
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

export function getActiveFolderKey() {
    return activeKey;
}
export function getActiveChildFolderKey() {
    return childKey;
}
export function getLeftSideBar() {
    return leftSidebarItems;
}
export default LeftSideBar;