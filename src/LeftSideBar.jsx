import React, { useState, useEffect, useContext } from 'react';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Layout, Modal, Form, theme, Input, Menu, Button } from 'antd';
import './app.css'; // Import CSS file
import { ManagerContext } from './App';

const leftSidebarItems = []

let activeKey = 0;
let childKey = -1;
let count = 0;
let childrenCount = 0;
let folderName = "";

function LeftSideBar() {
    const [leftNavBar, setLeftNavBar] = useState(leftSidebarItems);
    const [modalAddFolder, setModalAddFolder] = useState(false);
    const [modalAddDocFolder, setModalAddDocFolder] = useState(false);
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
                                    label: "Add Folder",
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
                                        let temp = sideBarFolder[activeKey].data.filter((data) => {
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
                                        let temp = sideBarFolder[activeKey].data.filter((data) => {
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
                                        let temp = sideBarFolder[activeKey].data.filter((data) => {
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
                                        let temp = sideBarFolder[activeKey].data.filter((data) => {
                                            return data.parentKey == childKey;
                                        })
                                        data.setDataSource(temp);
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
                                let temp = sideBarFolder[activeKey].data.filter((data) => {
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
export const sideBarFolder = leftSidebarItems;
export default LeftSideBar;