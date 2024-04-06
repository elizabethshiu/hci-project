import React, { useState, useContext } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Modal, Button } from 'antd';
import './app.css'; // Import CSS file
import { getActiveFolderKey, getActiveChildFolderKey, getLeftSideBar } from './LeftSideBar';
import { ManagerContext, getSourceKey } from './App';

function DeleteSource() {
    const [modalDeleteFile, setModalDeleteFile] = useState(false);
    const data = useContext(ManagerContext);

    return (
        <>
            <Button
                onClick={() => {
                    setModalDeleteFile(true)
                }}
                icon={<CloseOutlined />}
                danger
            >
                Delete
            </Button>
            <Modal
                title="Confirm Deletion of Source"
                centered="true"
                open={modalDeleteFile}
                onCancel={() => {
                    setModalDeleteFile(false)
                }}
                onOk={() => {
                    let sidebar = getLeftSideBar();
                    let parentIndex = sidebar.findIndex((data) => {
                        return data.key == getActiveFolderKey();
                    });
                    let dataIndex = sidebar[parentIndex].data.findIndex((data) => {
                        return data.key == getSourceKey();
                    });
                    if (sidebar[parentIndex].data[dataIndex].parentKey != getActiveFolderKey() + "trash") {
                        sidebar[parentIndex].data[dataIndex].parentKey = getActiveFolderKey() + "trash";
                    }
                    else {
                        getLeftSideBar()[parentIndex].data.splice(dataIndex, 1);
                    }
                    let temp = getLeftSideBar()[parentIndex].data.filter((data) => {
                        return data.parentKey == getActiveChildFolderKey();
                    })
                    data.setDataSource(temp);
                    setModalDeleteFile(false)
                }}
            >
            </Modal>
        </>)

}
export default DeleteSource;