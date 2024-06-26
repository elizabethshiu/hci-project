import React, { useState, useEffect } from 'react';
import { PlusOutlined, CloseOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Select, Tabs, Layout, Menu, theme, Table, Card, Button, Tooltip, Tag, Row, Col, Input, Form, Modal } from 'antd';

import './app.css'; // Import CSS file
import InfoForm from './components/infoForm';
import {
  SnippetsTwoTone
} from '@ant-design/icons';
import LeftSideBar, { getActiveFolderKey, getActiveChildFolderKey, getLeftSideBar, setActiveChildFolderKey } from './LeftSideBar';
import DeleteSource from './DeleteSource'


const { Header, Content, Sider } = Layout;

let articleCount = 6;
let sourceKey = -1;

const { TextArea } = Input; // Destructure TextArea from Input

const navBarItems = [
  {
    label: "Zotero",
    key: "zotero",
  },
];

const sourceColumns = [
  {
    title: '',
    dataIndex: 'notes',
    render: (notes) => {
      if (!notes || notes.length === 0) {
        return null; // If no notes, don't render anything
      }
      const concatenatedNotes = notes.join(', '); // Concatenate all notes into one string
      return (
        <span>
          <SnippetsTwoTone twoToneColor="#FDDA0D" style={{ fontSize: '20px' }} />
        </span>
      );
    },
  },
  {
    title: 'Item Type',
    dataIndex: 'itemType',
    render: (itemType) => {
      let itemTypeText = '';
      switch (itemType) {
        case 'Journal Article':
          itemTypeText = 'Journal Article';
          break;
        case 'Book':
          itemTypeText = 'Book';
          break;
        case 'Web Page':
          itemTypeText = 'Web Page';
          break;
        case 'Newspaper Article':
          itemTypeText = 'Newspaper Article';
          break;
        default:
          itemTypeText = 'N/A';
      }
      return itemTypeText;
    }
  },
  {
    title: 'Title',
    dataIndex: 'title',
  },
  {
    title: 'Authors',
    dataIndex: 'authors',
    render: (authors, record) => {
      if (!authors || authors.length === 0) {
        return 'N/A';
      }
      const condensedAuthors = record.condensedAuthors || authors.map(author => `${author.firstName} ${author.lastName}`).join(', ');
      return condensedAuthors;
    }
  },

  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: () =>
      <DeleteSource />,
  },
];

const App = () => {

  const [dataSource, setDataSource] = useState([]);
  const [modalAddFile, setModalAddFile] = useState(false);
  const [modalDeleteSubFolder, setModalDeleteSubFolder] = useState(false);
  const [leftNavBar, setLeftNavBar] = useState(getLeftSideBar());
  const [fileForm] = Form.useForm();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [showTagInput, setShowTagInput] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [selectedSource, setSelectedSource] = useState(null);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const isClickInsideTable = event.target.closest('.ant-table');
      const isClickInsideTabs = event.target.closest('.ant-tabs');
      const isClickInsideDropDown = event.target.closest('.ant-select-dropdown');
      const isClickInsidePickerDropDown = event.target.closest('.ant-picker-dropdown');
      const isClickInsideBtn = event.target.closest('.ant-btn-circle');
      const isClickInsideBtnDone = event.target.closest('.ant-btn-round');
      if (!isClickInsideTable && !isClickInsideTabs && !isClickInsideDropDown && !isClickInsidePickerDropDown & !isClickInsideBtn & !isClickInsideBtnDone) {
        setSelectedSource(null); // Reset selected source when clicking outside the table
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const checkDisabled = function () {
    if (getActiveChildFolderKey() == -1) {
      return true;
    }
    return false;
  }

  const checkSubFolderDisabled = function () {
    console.log(selectedSource);
    if (getActiveChildFolderKey() == -1 || getActiveChildFolderKey() == getActiveFolderKey() + "addFolder" || getActiveChildFolderKey() == getActiveFolderKey() + "publications" || getActiveChildFolderKey() == getActiveFolderKey() + "duplicates" || getActiveChildFolderKey() == getActiveFolderKey() + "unfiled" || getActiveChildFolderKey() == getActiveFolderKey() + "trash" || getActiveChildFolderKey() == getActiveFolderKey() + "delete") {
      return true;
    }
    return false;
  }

  const getSourceData = function () {
    if (getLeftSideBar().length == 0) {
      setDataSource([]);
    }
    else {
      let index = getLeftSideBar().findIndex((data) => {
        return data.key == getActiveFolderKey();
      })
      let temp = getLeftSideBar()[index].data.filter((data) => {
        return data.parentKey == getActiveChildFolderKey();
      })
      setDataSource(temp);
      console.log(selectedSource);
    }
  }

  const getCondensedAuthors = function () {
    let temp = fileForm.getFieldsValue("authorNames").authorNames;

    if (temp != undefined) {
      for (let i = 0; i < temp.length; i++) {
        if (temp[i] == undefined) {
          temp[i] = { firstName: "", lastName: "" };
        }
      }
    }
    if (temp != undefined && temp.length != 0 && temp[0].lastName != "" && temp.length == 1) {
      return temp[0].lastName;
    }
    else if (temp != undefined && temp.length != 0 && temp[0].lastName != "" && temp[1].lastName != "" && temp.length == 2) {
      return temp[0].lastName + " & " + temp[1].lastName;
    }
    else if (temp != undefined && temp.length != 0 && temp[0].lastName != "" && temp[1].lastName != "" && temp[2].lastName != "" && temp.length >= 3) {
      return temp[0].lastName + " et al.";
    }
    else {
      return 'N/A';
    }
  }

  const onSourceRowClick = (record) => {
    setSelectedSource(record);
    sourceKey = record.key;
  };

  const onRightSidebarChange = (key) => {
    console.log(key);
  };

  const handleNewNoteChange = (e) => {
    setNewNote(e.target.value);
  };
  // Function to add a new note
  const addNewNote = () => {
    // Perform any validation if needed
    if (newNote.trim() === "") {
      // Don't add empty notes
      return;
    }

    // Add the new note to the selected source
    const updatedSelectedSource = {
      ...selectedSource,
      notes: [...selectedSource.notes, newNote]
    };

    let index = getLeftSideBar().findIndex((data) => {
      return data.key == getActiveFolderKey();
    })
    let temp = getLeftSideBar()[index].data.findIndex((data) => {
      return data.key == selectedSource.key;
    })

    getLeftSideBar()[index].data[temp].notes.push(newNote);
    console.log(getLeftSideBar())
    getSourceData()

    // Update the selected source with the new note
    setSelectedSource(updatedSelectedSource);
    // Clear the new note input
    setNewNote("");
  };

  const handleDoneButtonClick = () => {
    addNewNote();
    toggleNoteInput(); // Hide the note input after adding the note
  };

  const toggleNoteInput = () => {
    setShowNoteInput(!showNoteInput);
    setNewNote(""); // Clear the input field when toggling
  };

  const handleNewTagChange = (e) => {
    setNewTag(e.target.value);
  };

  const addNewTag = () => {
    // Perform any validation if needed
    if (newTag.trim() === "") {
      // Don't add empty tags
      return;
    }

    // Add the new tag to the selected source
    const updatedSelectedSource = {
      ...selectedSource,
      tags: [...selectedSource.tags, newTag]
    };

    let index = getLeftSideBar().findIndex((data) => {
      return data.key == getActiveFolderKey();
    })
    let temp = getLeftSideBar()[index].data.findIndex((data) => {
      return data.key == selectedSource.key;
    })

    getLeftSideBar()[index].data[temp].tags.push(newTag);
    console.log(getLeftSideBar())
    getSourceData()

    // Update the selected source with the new tag
    setSelectedSource(updatedSelectedSource);
    // Clear the new tag input
    setNewTag("");
  };

  const handleTagDoneButtonClick = () => {
    addNewTag();
    toggleTagInput(); // Hide the tag input after adding the tag
  };

  const toggleTagInput = () => {
    setShowTagInput(!showTagInput);
    setNewTag(""); // Clear the input field when toggling
  };

  const rightSidebarItems = [
    {
      key: 'info',
      label: 'Info',
      render: (selectedSource) => (
        selectedSource ? (
          <InfoForm selectedSource={selectedSource} />
        ) : (
          <div>No source selected</div>
        )
      )
    },
    {
      key: 'notes',
      label: 'Notes',
      render: (selectedSource) => {
        return selectedSource ? (
          <Card
            title={
              <span>
                <SnippetsTwoTone twoToneColor="#FDDA0D" style={{ marginRight: 8, fontSize: '20px' }} />
                Notes
              </span>
            }
          >
            {selectedSource.notes.map((note, index) => (
              <Card key={index} style={{ marginBottom: 16 }}>
                <p>{note}</p>
              </Card>
            ))}
            {showNoteInput && (
              <div>
                <TextArea
                  placeholder="Add new note"
                  rows={4}
                  value={newNote}
                  onChange={handleNewNoteChange}
                  style={{ marginBottom: 16 }}
                />
                <Tooltip title="Cancel">
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<CloseOutlined />}
                    style={{ backgroundColor: 'red', marginRight: 8 }}
                    onClick={toggleNoteInput}
                  />
                </Tooltip>
                <div style={{ float: 'right' }}>
                  <Tooltip title="Done">
                    <Button type="primary" shape='round' onClick={handleDoneButtonClick}>Done</Button>
                  </Tooltip>
                </div>
              </div>
            )}
            {!showNoteInput && (
              <Tooltip title="Add note">
                <Button
                  type="primary"
                  shape="circle"
                  icon={<PlusOutlined />}
                  style={{ backgroundColor: '#34b233', marginBottom: 16 }}
                  onClick={toggleNoteInput}
                />
              </Tooltip>
            )}
          </Card>
        ) : (
          <div>No source selected</div>
        );
      }
    },
    {
      key: 'tags',
      label: 'Tags',
      render: (selectedSource) => (
        selectedSource ? (
          <div>
            {selectedSource.tags.map((tag, index) => (
              <Tag color="blue" key={index}>{tag}</Tag>
            ))}
            {showTagInput && (
              <div>
                <Input
                  placeholder="Add new tag"
                  value={newTag}
                  onChange={handleNewTagChange}
                  style={{ marginBottom: 16 }}
                />
                <Tooltip title="Cancel">
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<CloseOutlined />}
                    style={{ backgroundColor: 'red', marginRight: 8 }}
                    onClick={toggleTagInput}
                  />
                </Tooltip>
                <div style={{ float: 'right' }}>
                  <Tooltip title="Done">
                    <Button type="primary" shape='round' onClick={handleTagDoneButtonClick}>Done</Button>
                  </Tooltip>
                </div>
              </div>
            )}
            {!showTagInput && (
              <Tooltip title="Add tag">
                <Button
                  type="primary"
                  shape="circle"
                  icon={<PlusOutlined />}
                  style={{ backgroundColor: '#34b233', marginBottom: 16 }}
                  onClick={toggleTagInput}
                />
              </Tooltip>
            )}
          </div>
        ) : (
          <div>No source selected</div>
        )
      ),
    },
    {
      key: 'related',
      label: 'Related',
      render: (selectedSource) => {
        return selectedSource ? (
          <Card title="Recommended Articles">
            {selectedSource.recommendations.map((recommendation, index) => (
              <Card key={index} style={{ marginBottom: 16 }}>
                <p>Title: {recommendation.title}</p>
                <p>Author: {recommendation.author}</p>
                <a href={recommendation.link} target="_blank" rel="noopener noreferrer">Link To Article</a>
              </Card>
            ))}
          </Card>
        ) : (
          <div></div> // Blank tab pane if no source is selected
        );
      }
    },
  ];

  const filteredData = dataSource.filter((item) =>
    Object.values(item).some((value) =>
      value && typeof value === "string" && value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={navBarItems}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginLeft: 'auto', marginRight: 10, width: 200 }}
        />
        <Button onClick={() => setSearchTerm('')}><CloseOutlined /></Button>
      </Header>

      <Layout>
        <ManagerContext.Provider value={{ dataSource, setDataSource, checkDisabled, leftNavBar, setLeftNavBar, setSelectedSource }}>
          <LeftSideBar>
          </LeftSideBar>
        </ManagerContext.Provider>

        <Layout
          style={{
            padding: '0 24px 24px',
          }}
        >
          <Button
            disabled={checkDisabled()}
            type="primary"
            style={{ backgroundColor: '#2596be' }}
            onClick={() => {
              setModalAddFile(true);
            }}
          >
            Add Source <PlusOutlined />
          </Button>

          <Modal
            title="Add Source"
            centered="true"
            open={modalAddFile}
            onCancel={() => {
              fileForm.resetFields();
              setModalAddFile(false);
            }}
            footer={[]}
          >
            <Form
              form={fileForm}
              onFinish={() => {
                setModalAddFile(false);
                let index = getLeftSideBar().findIndex((data) => {
                  return data.key == getActiveFolderKey();
                })
                let authors = fileForm.getFieldsValue("authorNames").authorNames;
                if (authors == undefined) {
                  authors = [{
                    firstName: "",
                    lastName: ""
                  }]
                }
                getLeftSideBar()[index].data.unshift({
                  key: articleCount,
                  parentKey: getActiveChildFolderKey(),
                  title: fileForm.getFieldValue("fileName"),
                  authors: authors,
                  condensedAuthors: getCondensedAuthors(),
                  description: 'N/A',
                  notes: [],
                  recommendations: [], // No recommendations for this item
                  itemType: fileForm.getFieldValue("itemType"),
                  tags: [],
                  publishDate: "",
                  abstract: "",
                  url: "",
                });
                articleCount++;
                getSourceData();
                fileForm.resetFields();
              }}
            >
              Enter the Source Title:
              <Form.Item
                name="fileName"
              >
                <Input placeholder='Enter a Title'></Input>
              </Form.Item>
              Select a Source Type:
              <Form.Item
                name="itemType"
              >
                <Select
                  options={[
                    { value: '', label: '' },
                    { value: 'Web Page', label: 'Web Page' },
                    { value: 'Book', label: 'Book' },
                    { value: 'Newspaper Article', label: 'Newspaper Article' },
                    { value: 'Journal Article', label: 'Journal Article' },
                  ]}
                />
              </Form.Item>
              Enter Author Names:
              <Form.List
                name="authorNames"
              >
                {(fields, { add, remove }, { errors }) => (
                  <>
                    {fields.map((field) => (

                      <Form.Item
                        required={false}
                        key={field.key}
                      >
                        <Form.Item
                          {...field}
                          noStyle
                          name={[field.name, "firstName"]}
                          key={[field.key, "fname"]}
                          rules={[
                            {
                              required: true,
                              message: "Please Input an Author's First Name or Remove the Field!",
                            },
                          ]}
                        >
                          <Input placeholder="Author First Name" style={{ width: '45%' }} />
                        </Form.Item>
                        <Form.Item
                          {...field}
                          noStyle
                          name={[field.name, "lastName"]}
                          key={[field.key, "lName"]}
                          rules={[
                            {
                              required: true,
                              message: "Please Input an Author's Last Name or Remove the Field!",
                            },
                          ]}
                        >
                          <Input placeholder="Author Last Name" style={{ width: '45%' }} />
                        </Form.Item>
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => remove(field.name)} />
                      </Form.Item>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        style={{ width: '60%' }}
                        icon={<PlusOutlined />}
                      >
                        Add field
                      </Button>
                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  </>
                )}
              </Form.List>
              <Form.Item
                name="submitFileName"
              >
                <Button key="submit" type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Modal>

          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 500,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <ManagerContext.Provider value={{ dataSource, setDataSource, checkDisabled, setSelectedSource }}>
              <Table
                columns={sourceColumns}
                expandable={{
                  expandedRowRender: (record) => (
                    <p
                      style={{
                        margin: 0,
                      }}
                    >
                      {record.description}
                    </p>
                  ),
                  rowExpandable: (record) => record.title !== 'Not Expandable',
                }}
                dataSource={filteredData}
                rowClassName={(record, index) => (record.title != undefined && record.authors != undefined && ((record.title.length && record.authors.length && record.authors[0].lastName != "")) ? "complete" : "incomplete")}
                pagination={false}
                onRow={(record, rowIndex) => ({
                  onClick: () => {
                    onSourceRowClick(record);
                  }
                })}
              />
              <br />
              <Row>
                <Col span={6} />
                <Col span={12}>
                  <Button
                    icon={<CloseOutlined />}
                    style={{ width: '100%' }}
                    danger
                    disabled={checkSubFolderDisabled()}
                    onClick={() => {
                      setModalDeleteSubFolder(true);
                    }}
                  >Delete Sub-Folder</Button>
                </Col>
                <Col span={6} />
              </Row>
            </ManagerContext.Provider>
          </Content>
          <Modal
            title="Confirm Deletion of Sub-Folder"
            centered="true"
            open={modalDeleteSubFolder}
            onCancel={() => {
              setModalDeleteSubFolder(false)
            }}
            onOk={() => {
              //get active folder key
              let parentIndex = getLeftSideBar().findIndex((data) => {
                return data.key == getActiveFolderKey();
              });
              //get index of data matching child key
              let index = getLeftSideBar()[parentIndex].data.findIndex( 
                (temp) => temp.parentKey === getActiveChildFolderKey() 
              ); 
              //remove data that matches child folder key
              while (index != -1) {
                getLeftSideBar()[parentIndex].data.splice(index, 1);
                index = getLeftSideBar()[parentIndex].data.findIndex( 
                  (temp) => temp.parentKey === getActiveChildFolderKey() 
                ); 
              }
              let subFolderIndex = getLeftSideBar()[parentIndex].children.findIndex((folders) => {
                return folders.key == getActiveChildFolderKey();
              });
              //remove subfolder
              getLeftSideBar()[parentIndex].children.splice(subFolderIndex, 1);

              //update render values
              let temp = getLeftSideBar().slice();
              setModalDeleteSubFolder(false);
              setSelectedSource(null);
              getSourceData();
              setActiveChildFolderKey(-1);
              setLeftNavBar(temp);
            }}
          >
          </Modal>
        </Layout>
        <ManagerContext.Provider value={{ dataSource, setDataSource, setSelectedSource }}>
          <Sider
            width={400}
            style={{
              background: colorBgContainer,
              paddingLeft: 12
            }}
          >
            {!selectedSource && (
              <Card title="Notes">
                {dataSource.map(source => (
                  source.notes.length > 0 && (
                    <div key={source.key}>
                      <SnippetsTwoTone twoToneColor="#FDDA0D" style={{ fontSize: '20px' }} />
                      <h3>{source.title}</h3>
                      {source.notes.map((note, index) => (
                        <Card key={index} style={{ marginBottom: 16 }}>
                          <p>{note}</p>
                        </Card>
                      ))}
                    </div>
                  )
                ))}
              </Card>
            )}
            {selectedSource && (
                <Tabs defaultActiveKey="1" items={rightSidebarItems.map(item => ({
                  ...item,
                  children: item.render(selectedSource, newNote, handleNewNoteChange, addNewNote) // Pass newNote and its functions
                }))}
                  onChange={onRightSidebarChange} />
            )}
          </Sider>
        </ManagerContext.Provider>
      </Layout>
    </Layout >
  );
};

export const ManagerContext = React.createContext(null);
export function getSourceKey() {
  return sourceKey;
}
export default App;
