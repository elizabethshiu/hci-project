import React, { useState, useEffect } from 'react';
import { DeleteOutlined, PlusOutlined, DownOutlined } from '@ant-design/icons';
import { Tabs, Layout, Menu, theme, Table, Card, Button, Tooltip, Tag, Form, Input} from 'antd';
import './app.css'; // Import CSS file
import InfoForm from './infoForm';
import sourceData from './data/citations';
import {
  SnippetsTwoTone
} from '@ant-design/icons';

const { Header, Content, Sider } = Layout;

const navBarItems = [
  {
    label: "My Library",
    key: "library",
  }
];

const leftSidebarItems = [
  {
    label: "My Library",
    key: "library",
    children: [
      {
        label: "My Publications",
        key: "publications"
      },
      {
        label: "Duplicate Items",
        key: "duplicates"
      },
      {
        label: "Unfiled Items",
        key: "unfiled"
      },
      {
        label: "Trash",
        key: "trash",
        icon: <DeleteOutlined />,
        onClick: () => {
          console.log('clicked library')
        }
      }
    ], 
    
  }
];

const rightSidebarItems = [
  {
    key: 'info',
    label: 'Info',
    render: (sourceData) => <InfoForm/>,
  },
  {
    key: 'notes',
    label: 'Notes',
    render: (selectedSource) => {
      return selectedSource ? (
        <Card title= {
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


const App = () => {
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
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['library']}
            style={{
              height: '100%',
              borderRight: 0,
            }}
            items={leftSidebarItems}
          />
        </Sider>
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
              dataSource={sourceData}
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
            <Tabs 
              defaultActiveKey="1" 
              items={rightSidebarItems.map(item => ({
              ...item,
              children: item.render(selectedSource)
              }))} 
              onChange={onRightSidebarChange} />
          )}
        </Sider>
      </Layout>
    </Layout>
  );
};

export default App;
