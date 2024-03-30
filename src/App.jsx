import React, { useState, useEffect } from 'react';
import { DeleteOutlined, PlusOutlined, DownOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Select, Modal, Form, Input, Tabs, Layout, Menu, theme, Table, Card, Button, Tooltip, Tag } from 'antd';
import './app.css'; // Import CSS file
import {
  SnippetsTwoTone
} from '@ant-design/icons';
import LeftSideBar, { getActiveFolderKey, getActiveChildFolderKey, sideBarFolder } from './LeftSideBar';

const { Header, Content, Sider } = Layout;

let articleCount = 0;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

const navBarItems = [
  {
    label: "Zotero",
    key: "zotero",
  },
];

const rightSidebarItems = [
  {
    key: 'info',
    label: 'Info',
    render: (sourceData) => <div>{sourceData.description}</div>,
  },
  {
    key: 'notes',
    label: 'Notes',
    render: (selectedSource) => {
      return selectedSource ? (
        <Card title={
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

          <Tooltip title="Add note">
            <Button type="primary" shape="circle" icon={<PlusOutlined />} style={{ backgroundColor: '#34b233' }} />
          </Tooltip>


        </Card>
      ) : (
        <div></div> // Blank tab pane if no source is selected
      );
    }
  },
  {
    key: 'tags',
    label: 'Tags',
    render: (selectedSource) => (
      <div>
        {selectedSource.tags.map((tag, index) => (
          <Tag color="blue" key={index}>{tag}</Tag>
        ))}

        <Tooltip title="Add tag">
          <Button type="primary" shape="circle" icon={<PlusOutlined />} style={{ backgroundColor: '#34b233', fontSize: '10px', padding: '4px' }} />
        </Tooltip>
      </div>
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
    render: () => <a>Delete</a>,
  },
];

const sourceData = [
  {
    key: 1,
    parentKey: "0MyPublications",
    title: 'I.—COMPUTING MACHINERY AND INTELLIGENCE',
    authors: [{ firstName: 'Alan', lastName: 'Turing' }],
    condensedAuthors: 'Turing',
    description: 'PDF here (?)',
    notes: ['Note 1 for I.—COMPUTING MACHINERY AND INTELLIGENCE', 'Note 2 for I.—COMPUTING MACHINERY AND INTELLIGENCE'],
    itemType: 'Journal Article',
    recommendations: [
      {
        title: 'Machine Learning: A Probabilistic Perspective',
        author: 'Kevin P. Murphy',
        link: `https://www.google.com/search?q=Machine+Learning:+A+Probabilistic+Perspective`
      },
      {
        title: 'Deep Learning for Natural Language Processing',
        author: 'Yoshua Bengio, Ian Goodfellow, Aaron Courville',
        link: `https://www.google.com/search?q=Deep+Learning+for+Natural+Language+Processing`
      },
      {
        title: 'Pattern Recognition and Machine Learning',
        author: 'Christopher M. Bishop',
        link: `https://www.google.com/search?q=Pattern+Recognition+and+Machine+Learning`
      }
    ],
    itemType: 'Journal Article',
    tags: ['background', 'discussion']
  },
  {
    key: 2,
    parentKey: "0MyPublications",
    title: 'Artificial Intelligence: A Modern Approach',
    authors: [{ firstName: 'Peter', lastName: 'Stuart' }, { firstName: 'Peter', lastName: 'Norvig' }],
    condensedAuthors: 'Stuart & Norvig',
    description: 'PDF here (?)',
    notes: ['Note 1 for Artificial Intelligence: A Modern Approach', 'Note 2 for Artificial Intelligence: A Modern Approach'],
    itemType: 'Book',
    recommendations: [
      {
        title: 'Artificial Intelligence: Foundations of Computational Agents',
        author: 'David L. Poole, Alan K. Mackworth',
        link: `https://www.google.com/search?q=Artificial+Intelligence:+Foundations+of+Computational+Agents`
      },
      {
        title: 'Introduction to Autonomous Robots',
        author: 'Nikolaus Correll, Bradley Hayes',
        link: `https://www.google.com/search?q=Introduction+to+Autonomous+Robots`
      }
    ],
    itemType: 'Book',
    tags: ['background']
  },
  {
    key: 3,
    parentKey: "0MyPublications",
    title: 'Foundations of Machine Learning',
    authors: [{ firstName: 'Mehryar', lastName: 'Mohri' }, { firstName: 'Afshin', lastName: 'Rostamizadeh' }, { firstName: 'Ameet', lastName: 'Talwalkar' }],
    condensedAuthors: 'Mohri et al.',
    description: 'PDF here (?)',
    notes: ['Note 1 for Foundations of Machine Learning'],
    itemType: 'Book',
    recommendations: [
      {
        title: 'Understanding Machine Learning: From Theory to Algorithms',
        author: 'Shai Shalev-Shwartz, Shai Ben-David',
        link: `https://www.google.com/search?q=Understanding+Machine+Learning:+From+Theory+to+Algorithms`
      },
      {
        title: 'Machine Learning Yearning',
        author: 'Andrew Ng',
        link: `https://www.google.com/search?q=Machine+Learning+Yearning`
      }
    ],
    itemType: 'Book',
    tags: []
  },
  {
    key: 4,
    parentKey: "0MyPublications",
    title: 'A New High In Deal Activity To Artificial Intelligence Startups In Q4\'15',
    authors: [],
    condensedAuthors: 'N/A',
    description: 'N/A',
    notes: ['Note 1 for A New High In Deal Activity To Artificial Intelligence Startups In Q4\'15'],
    recommendations: [], // No recommendations for this item
    itemType: 'Web Page',
    tags: ['background', 'discussion']
  },
  {
    key: 5,
    parentKey: "0MyPublications",
    title: 'ImageNet Classification with Deep Convolutional Neural Networks',
    authors: [{ firstName: 'Alex', lastName: 'Krizhevsky' }, { firstName: 'Ilya', lastName: 'Sutskever' }, { firstName: 'Geoffrey', lastName: 'Hinton' }],
    condensedAuthors: 'Krizhevsky et al.',
    description: 'PDF here (?)',
    notes: ['Note 1 for ImageNet Classification with Deep Convolutional Neural Networks'],
    itemType: 'Journal Article',
    recommendations: [
      {
        title: 'Neural Networks and Deep Learning',
        author: 'Michael Nielsen',
        link: `https://www.google.com/search?q=Neural+Networks+and+Deep+Learning`
      },
      {
        title: 'Deep Learning',
        author: 'Ian Goodfellow, Yoshua Bengio, Aaron Courville',
        link: `https://www.google.com/search?q=Deep+Learning`
      }
    ],
    itemType: 'Journal Article',
    tags: []
  }
];

const App = () => {

  const [dataSource, setDataSource] = useState(null);
  const [modalAddFile, setModalAddFile] = useState(false);
  const [fileForm] = Form.useForm();


  const checkDisabled = function () {
    if (getActiveChildFolderKey() == -1) {
      return true;
    }
    return false;
  }

  const getSourceData = function () {
    if (sideBarFolder.length == 0) {
      setDataSource([]);
    }
    else {
      let temp = sideBarFolder[getActiveFolderKey()].data.filter((data) => {
        return data.parentKey == getActiveChildFolderKey();
      })
      setDataSource(temp);
    }
  }

  const getCondensedAuthors = function () {
    let temp = fileForm.getFieldsValue("authorNames").authorNames;
    if (temp.length != 0){
      return temp[0].lastName + " et al.";
    }
    else{
      return 'N/A';
    }
  }

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  const [selectedSource, setSelectedSource] = useState(null);

  const onSourceRowClick = (record) => {
    setSelectedSource(record);
  };

  const onRightSidebarChange = (key) => {
    console.log(key);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const isClickInsideTable = event.target.closest('.ant-table');
      if (!isClickInsideTable) {
        setSelectedSource(null); // Reset selected source when clicking outside the table
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

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
      </Header>

      <Layout>
        <ManagerContext.Provider value={{ dataSource, setDataSource }}>
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
            Add File <PlusOutlined />
          </Button>

          <Modal
            title="Add File"
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
                sideBarFolder[getActiveFolderKey()].data.unshift({
                  key: articleCount,
                  parentKey: getActiveChildFolderKey(),
                  title: fileForm.getFieldValue("fileName"),
                  authors: fileForm.getFieldsValue("authorNames").authorNames,
                  condensedAuthors: getCondensedAuthors(),
                  description: 'N/A',
                  notes: [],
                  recommendations: [], // No recommendations for this item
                  itemType: fileForm.getFieldValue("itemType"),
                  tags: []
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
                        >
                          <Input placeholder="Author First Name" style={{ width: '45%' }} />
                        </Form.Item>
                        <Form.Item
                          {...field}
                          noStyle
                          name={[field.name, "lastName"]}
                          key={[field.key, "lName"]}
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
              dataSource={dataSource}
              pagination={false}
              onRow={(record, rowIndex) => ({
                onClick: () => {
                  onSourceRowClick(record);
                }
              })}
            />

          </Content>
        </Layout>

        <Sider
          width={400}
          style={{
            background: colorBgContainer,
            paddingLeft: 12
          }}
        >
          {!selectedSource && (
            <Card title="Notes">
              {sourceData.map(source => (
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
              children: item.render(selectedSource)
            }))} onChange={onRightSidebarChange} />
          )}
        </Sider>
      </Layout>
    </Layout >
  );
};

export const ManagerContext = React.createContext(null);
export default App;
