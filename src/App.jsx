import React, { useState, useEffect } from 'react';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Tabs, Layout, Menu, theme, Table, Card, Button, Tooltip, Tag, Input} from 'antd';
import './app.css'; // Import CSS file
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
    render: (selectedSource) => (
      selectedSource ? (
        <div>{selectedSource.description}</div>
      ) : (
        <div>No source selected</div>
      )
    )
  },
  {
    key: 'notes',
    label: 'Notes',
    render: (selectedSource, handleAddNote, handleNoteChange, handleNoteSubmit, newNote, addingNote) => {
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
  
          {addingNote ? (
            <div>
              <Input
                value={newNote}
                onChange={handleNoteChange}
                onPressEnter={handleNoteSubmit}
              />
              <Button type="primary" onClick={handleNoteSubmit}>Add</Button>
            </div>
          ) : (
            <Tooltip title="Add note">
              <Button
                type="primary"
                shape="circle"
                icon={<PlusOutlined />}
                onClick={handleAddNote}
                style={{ backgroundColor: '#34b233' }}
              />
            </Tooltip>
          )}
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
      selectedSource ? (
        <div>
          {selectedSource.tags.map((tag, index) => (
            <Tag color="blue" key={index}>{tag}</Tag>
          ))}
          <Tooltip title="Add tag">
            <Button type="primary" shape="circle" icon={<PlusOutlined />} style={{ backgroundColor: '#34b233', fontSize: '10px', padding: '4px' }} />
          </Tooltip>
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
    title: 'I.—COMPUTING MACHINERY AND INTELLIGENCE',
    authors: [{ firstName: 'Alan', lastName: 'Turing' }],
    condensedAuthors: 'Turing',
    description: 'PDF here (?)',
    notes: ['Note 1 for I.—COMPUTING MACHINERY AND INTELLIGENCE', 'Note 2 for I.—COMPUTING MACHINERY AND INTELLIGENCE'],
    itemType: 'Journal Article',
    tags: ['background', 'discussion'],
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
    ]
    
  },
  {
    key: 2,
    title: 'Artificial Intelligence: A Modern Approach',
    authors: [{ firstName: 'Peter', lastName: 'Stuart' }, { firstName: 'Peter', lastName: 'Norvig' }],
    condensedAuthors: 'Stuart & Norvig',
    description: 'PDF here (?)',
    notes: ['Note 1 for Artificial Intelligence: A Modern Approach', 'Note 2 for Artificial Intelligence: A Modern Approach'],
    itemType: 'Book',
    tags: ['background'],
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
    ]
    
  },
  {
    key: 3,
    title: 'Foundations of Machine Learning',
    authors: [{ firstName: 'Mehryar', lastName: 'Mohri' }, { firstName: 'Afshin', lastName: 'Rostamizadeh' }, { firstName: 'Ameet', lastName: 'Talwalkar' }],
    condensedAuthors: 'Mohri et al.',
    description: 'PDF here (?)',
    notes: [],
    itemType: 'Book',
    tags: [],
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
    ]
  },
  {
    key: 4,
    title: 'A New High In Deal Activity To Artificial Intelligence Startups In Q4\'15',
    authors: [],
    condensedAuthors: 'N/A',
    description: 'N/A',
    notes: [],
    itemType: 'Web Page',
    tags: ['background', 'discussion'],
    recommendations: [] // No recommendations for this item
    
  },
  {
    key: 5,
    title: 'ImageNet Classification with Deep Convolutional Neural Networks',
    authors: [{ firstName: 'Alex', lastName: 'Krizhevsky' }, { firstName: 'Ilya', lastName: 'Sutskever' }, { firstName: 'Geoffrey', lastName: 'Hinton' }],
    condensedAuthors: 'Krizhevsky et al.',
    description: 'PDF here (?)',
    notes: ['Note 1 for ImageNet Classification with Deep Convolutional Neural Networks'],
    itemType: 'Journal Article',
    tags :[],
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
    ]
    
  }
];

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  
  
  const [selectedSource, setSelectedSource] = useState(null);
  
  //ADD NOTE STUFF
  const [addingNote, setAddingNote] = useState(false);
  const [newNote, setNewNote] = useState('');

  const onSourceRowClick = (record) => {
    setSelectedSource(record);
  };

  const onRightSidebarChange = (key) => {
    console.log(key);
  }; 

  const handleAddNote = () => {
    if (selectedSource) {
      setAddingNote(true); // Show the input box if a source is selected
    }
  };
  
  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  };
  
  const handleNoteSubmit = () => {
    // Logic to add the new note
    // Reset the input field and state
    setNewNote('');
    setAddingNote(false);
  };
  //END OF ADD NOTE STUFF

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
          {selectedSource && !addingNote && (
          <Tabs defaultActiveKey="1" items={rightSidebarItems.map(item => ({
            ...item,
            children: item.render(selectedSource)
          }))} onChange={onRightSidebarChange} />
        )}
        {addingNote && selectedSource && (
          <div>
            <Input
              value={newNote}
              onChange={handleNoteChange}
              onPressEnter={handleNoteSubmit}
            />
            <Button type="primary" onClick={handleNoteSubmit}>Add</Button>
          </div>
        )}
        </Sider>
      </Layout>
    </Layout>
  );
};

export default App;
