import React, { useEffect, useState, useContext } from 'react';
import { Space, Select, Input, Button, Row, DatePicker, Form } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined, SaveOutlined } from '@ant-design/icons';
import citationData from '../data/citations';
import { ManagerContext } from '../App';
import { getLeftSideBar, getActiveChildFolderKey, getActiveFolderKey } from '../LeftSideBar';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';


dayjs.extend(customParseFormat);
const dateFormat = 'YYYY-MM-DD';
const { TextArea } = Input;

const itemTypes = [
    {
        value: 'Journal Article',
        label: 'Journal Article'
    },
    {
        value: 'Book',
        label: 'Book'
    },
    {
        value: 'Web Page',
        label: 'Web Page'
    },
]

const InfoForm = (selectedSource) => {
    const sourceData = selectedSource.selectedSource;
    const [citation, setCitation] = useState(sourceData)
    const [title, setTitle] = useState(citation.title);
    const [authors, setAuthors] = useState(citation.authors);
    const [itemType, setItemType] = useState(citation.itemType);
    const [publishDate, setPublishDate] = useState(citation.publishDate);
    const [abstract, setAbstract] = useState(citation.description);
    const [url, setUrl] = useState(citation.url);

    useEffect(() => {
        const citation = selectedSource.selectedSource
        setCitation(citation)
        setTitle(citation.title)
        setAuthors(citation.authors)
        setItemType(citation.itemType)
        setPublishDate(citation.publishDate)
        console.log(citationData)
    }, [selectedSource])

    const handleItemTypeChange = (value) => {
        sourceData.itemType = value;
        setItemType(value);
        updateSources()
    }

    const handleAddAuthor = () => {
        const newAuthors = [...authors, { firstName: "", lastName: "" }];
        setAuthors(newAuthors);
    };

    const handleAuthorChange = (event, index) => {
        let { name, value } = event.target;
        let onChangeValue = [...authors];
        onChangeValue[index][name] = value;
        sourceData.authors= onChangeValue;
        setAuthors(onChangeValue);
    };

    const handleDeleteAuthor = (index) => {
        const newArray = [...authors];
        newArray.splice(index, 1);
        sourceData.authors= newArray;
        setAuthors(newArray);
    };

    const handleDateChange = (date, dateString) => {
        console.log(date, dateString);
        sourceData.publishDate = dateString;
        setPublishDate(dateString);
    };

    const handleAbstractChange = (event) => {
        sourceData.description = event.target.value;
        setAbstract(event.target.value);
    }

    const handleUrlChange = (event) => {
        sourceData.url = event.target.value;
        setUrl(event.target.value);
    }

    const handleTitleChange = (event) => {
        sourceData.title = event.target.value;
        setTitle(event.target.value);
    }

    return (
        <>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <div>
                <label>Title</label>
                <Input 
                    name='title'
                    value={title}
                    onChange={handleTitleChange}
                />
            </div>
            <div>
                <Row>
                <label style={{paddingRight: 5}}>Item Type</label>
                <Select
                    style={{
                        width: 200,
                    }}
                    onChange={handleItemTypeChange}
                    options={itemTypes}
                    value={itemType}
                />
                </Row>
                <Row style={{paddingTop: 5}}>
                    <label style={{paddingRight: 5}}>Publish Date</label>
                    <DatePicker 
                        onChange={handleDateChange} 
                        value={dayjs(publishDate, dateFormat)}
                    />
                </Row>
            </div>
            <div className="authors">
                <label>Authors</label>
                {authors.map((item, index) => (
                    <div className="input_container" key={index}>
                    <Input
                        name="firstName"
                        placeholder="First Name"
                        value={item.firstName}
                        onChange={(event) => handleAuthorChange(event, index)}
                        style={{
                            width: 160,
                            padding: 3
                        }}
                    />
                    <Input
                        name="lastName"
                        placeholder="Last Name"
                        value={item.lastName}
                        onChange={(event) => handleAuthorChange(event, index)}
                        style={{
                            width: 160,
                            padding: 3
                        }}
                    />
                    {authors.length > 1 && (
                        <Button 
                            shape='circle'
                            onClick={() => handleDeleteAuthor(index)}
                            icon={<MinusCircleOutlined />}
                        />
                    )}
                    {index === authors.length - 1 && (
                        <Button 
                            shape='circle'
                            onClick={() => handleAddAuthor()}
                            icon={<PlusCircleOutlined />}
                        />
                    )}
                    </div>
                ))}
            </div>
            <div className='abstract'>
                <label>Abstract</label>
                <TextArea 
                    rows={4}
                    value={abstract} 
                    onChange={handleAbstractChange}
                />

                <label>URL</label>
                <Input
                    value={url}
                    onChange={handleUrlChange}
                />
            </div>
            
        </Space>
        </>
    )
}

export default InfoForm;