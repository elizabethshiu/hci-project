import React, { useState } from 'react';
import { DeleteOutlined, PlusOutlined, CloseOutlined, DownOutlined } from '@ant-design/icons';
import { Tabs, Layout, Menu, theme, Table, Card, Button, Tooltip, Tag, Input} from 'antd';
import './app.css'; // Import CSS file
import InfoForm from './components/infoForm';
import citationData from './data/citations';
import {
  SnippetsTwoTone
} from '@ant-design/icons';
import LeftSideBar from './LeftSideBar';

const { Header, Content, Sider } = Layout;
const { TextArea } = Input; // Destructure TextArea from Input

const navBarItems = [
  {
    label: "Zotero",
    key: "zotero",
  },
];

const tableColumns = [
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


const App = () => {
  const [sourceData, setSourceData] = useState(citationData);
  const [searchTerm, setSearchTerm] = useState('');

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [showTagInput, setShowTagInput] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [selectedSource, setSelectedSource] = useState(null);

  const onSourceRowClick = (record) => {
    setSelectedSource(record);
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
          <InfoForm selectedSource={selectedSource}/>
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
                    <Button type="primary" onClick={handleDoneButtonClick}>Done</Button>
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
                    <Button type="primary" onClick={handleTagDoneButtonClick}>Done</Button>
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

  const filteredData = sourceData.filter((item) =>
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
        <LeftSideBar>
        </LeftSideBar>
        <Layout
          style={{
            padding: '0 24px 24px',
          }}
        >
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
              columns={tableColumns}
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
              rowClassName={(record, index) => ((record.title.length && record.authors.length) ? "complete" : "incomplete")}
              pagination={false}
              onRow={(record, rowIndex) => ({
                onClick: () => {
                  onSourceRowClick(record);
                  console.log(record.title.length);
                }
              })}
            />
          </Content>
        </Layout>
        {selectedSource && (
          <Sider
            width={400}
            style={{
              background: colorBgContainer,
              paddingLeft: 12
            }}
          >
            <Tabs defaultActiveKey="1" items={rightSidebarItems.map(item => ({
              ...item,
              children: item.render(selectedSource, newNote, handleNewNoteChange, addNewNote) // Pass newNote and its functions
            }))} onChange={onRightSidebarChange} />
          </Sider>
        )}
      </Layout>
    </Layout>
  );
};

export default App;
