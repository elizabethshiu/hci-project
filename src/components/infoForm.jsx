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
    { 
        value: 'Newspaper Article', 
        label: 'Newspaper Article' 
    },
]

const InfoForm = (selectedSource) => {
    const data = useContext(ManagerContext);
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
        setAbstract(citation.description)
        setUrl(citation.url)
        console.log(citationData)
    }, [selectedSource])

    const getSourceData = function () {
        if (sourceData.authors != undefined && sourceData.authors.length != 0 && sourceData.authors[0].lastName != "" && sourceData.authors.length == 1) {
            sourceData.condensedAuthors = sourceData.authors[0].lastName;
        }
        else if(sourceData.authors != undefined && sourceData.authors.length != 0 && sourceData.authors[0].lastName != "" && sourceData.authors.length == 2){
            sourceData.condensedAuthors = sourceData.authors[0].lastName + " & " + sourceData.authors[1].lastName;
        }
        else if(sourceData.authors != undefined && sourceData.authors.length != 0 && sourceData.authors[0].lastName != "" && sourceData.authors.length == 3){
            sourceData.condensedAuthors = sourceData.authors[0].lastName + " et al.";
        }
        else {
            sourceData.condensedAuthors = 'N/A';
        }
        if (getLeftSideBar().length == 0) {
            data.setDataSource([]);
        }
        else {
            let index = getLeftSideBar().findIndex((data) => {
                return data.key == getActiveFolderKey();
            })
            let temp = getLeftSideBar()[index].data.filter((data) => {
                return data.parentKey == getActiveChildFolderKey();
            })
            data.setDataSource(temp);
        }
    }

    const handleItemTypeChange = (value) => {
        sourceData.itemType = value;
        setItemType(value);
        getSourceData()
    }

    const handleAddAuthor = () => {
        const newAuthors = [...authors, { firstName: "", lastName: "" }];
        sourceData.authors = newAuthors;
        setAuthors(newAuthors);
        getSourceData()
    };

    const handleAuthorChange = (event, index) => {
        let { name, value } = event.target;
        let onChangeValue = [...authors];
        onChangeValue[index][name] = value;
        sourceData.authors = onChangeValue;
        setAuthors(onChangeValue);
        getSourceData()
    };

    const handleDeleteAuthor = (index) => {
        const newArray = [...authors];
        newArray.splice(index, 1);
        sourceData.authors = newArray;
        setAuthors(newArray);
        getSourceData()
    };

    const handleDateChange = (date, dateString) => {
        console.log(date, dateString);
        sourceData.publishDate = dateString;
        setPublishDate(dateString);
        getSourceData()
    };

    const handleAbstractChange = (event) => {
        sourceData.description = event.target.value;
        setAbstract(event.target.value);
        getSourceData()
    }

    const handleUrlChange = (event) => {
        sourceData.url = event.target.value;
        setUrl(event.target.value);
        console.log(sourceData)
        getSourceData()
    }

    const handleTitleChange = (event) => {
        sourceData.title = event.target.value;
        setTitle(event.target.value);
        getSourceData()
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
                        <label style={{ paddingRight: 5 }}>Item Type</label>
                        <Select
                            style={{
                                width: 200,
                            }}
                            onChange={handleItemTypeChange}
                            options={itemTypes}
                            value={itemType}
                        />
                    </Row>
                    <Row style={{ paddingTop: 5 }}>
                        <label style={{ paddingRight: 5 }}>Publish Date</label>
                        <DatePicker
                            onChange={handleDateChange}
                            value={(dayjs(publishDate, dateFormat).$d != "Invalid Date") ? dayjs(publishDate, dateFormat) : null}
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