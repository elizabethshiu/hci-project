import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Tabs, Layout, Menu, theme, Table } from 'antd';
import './app.css';


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
    children: 'Insert info form',
  },
  {
    key: 'notes',
    label: 'Notes',
    children: 'Content of Tab Pane 2',
  },
  {
    key: 'tags',
    label: 'Tags',
    children: 'Content of Tab Pane 3',
  },
  {
    key: 'related',
    label: 'Related',
    children: 'Content of Tab Pane 4',
  },
];

const articleColumns = [
  {
    title: 'Title',
    dataIndex: 'title',
  },
  {
    title: 'Author',
    dataIndex: 'author',
  },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: () => <a>Delete</a>,
  },
];

const articleData = [
  {
    key: 1,
    title: 'Fake Article 1',
    author: 'John',
    description: 'PDF here (?)',
  },
  {
    key: 2,
    title: 'Fake Article 1',
    author: 'John',
    description: 'PDF here (?)',
  },
  {
    key: 3,
    title: 'Not Expandable',
    author: 'John',
    description: 'N/A',
  }
]

const onRightSidebarChange = (key) => {
  console.log(key);
} 

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
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
              columns={articleColumns}
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
              dataSource={articleData}
              pagination={false}
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
            <Tabs defaultActiveKey="1" items={rightSidebarItems} onChange={onRightSidebarChange} />
            
        </Sider>
      </Layout>
    </Layout>



  );
};
export default App;