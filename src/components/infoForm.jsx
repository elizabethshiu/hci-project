import React, { useEffect, useState, useContext } from 'react';
import { Space, Select, Input, Button, Row, DatePicker, Form } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined, SaveOutlined } from '@ant-design/icons';
import citationData from '../data/citations';
import { ManagerContext } from '../App';
import { getLeftSideBar, getActiveChildFolderKey, getActiveFolderKey } from '../LeftSideBar';
const { TextArea } = Input;

const itemTypes = [
    {
        value: 'Journal Article',
        label: 'Journal Article'
    },
    {
        value: 'Newspaper Article',
        label: 'Newspaper Article'
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





const InfoForm = (selectedSource, citationKey) => {
    const data = useContext(ManagerContext);
    const sourceData = selectedSource.selectedSource;
    const [citation, setCitation] = useState(sourceData)
    const [authors, setAuthors] = useState(citation.authors);
    const [itemType, setItemType] = useState(citation.itemType);
    const [fileForm] = Form.useForm();

    useEffect(() => {
        const citation = selectedSource.selectedSource
        let temp = citation;
        setCitation(temp)
        setAuthors(citation.authors)
        setItemType(citation.itemType)
        console.log(citation);
    }, [selectedSource, citationData])

    const updateSources = () => {
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
        console.log(value);
        sourceData.itemType = value;
        setItemType(value);
        updateSources()
    }

    const handleAddAuthor = () => {
        sourceData.authors.push({ firstName: "", lastName: "" });
        setAuthors(sourceData.authors);

        updateSources()
    };

    const handleChange = (event, index) => {
        let { name, value } = event.target;
        let onChangeValue = [...authors];
        onChangeValue[index][name] = value;
        if (sourceData != undefined && sourceData.authors.length != 0 && sourceData.authors[0].lastName != ""){
            sourceData.condensedAuthors = sourceData.authors[0].lastName + " et al."
        }
        else{
            sourceData.condensedAuthors = 'N/A'
        }
        setAuthors(onChangeValue);
        updateSources()
    };

    const handleTitleChange = () => {
        sourceData.title = fileForm.getFieldValue("fileName");;
        updateSources()
    };

    const handleDeleteAAuthor = () => {
        sourceData.authors.pop();
        setAuthors(sourceData.authors);

        updateSources()
    };

    const handleDateChange = (date, dateString) => {
        console.log(date, dateString);
    };

    return (
        <>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                <div>
                    <label>Title</label>
                    <Form
                        form={fileForm}
                    >
                        <Form.Item
                            name="fileName"
                        >
                            <Input
                                name='title'
                                value={sourceData.title}
                                placeholder='title'
                                onChange={handleTitleChange}
                            />
                        </Form.Item>
                    </Form>
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
                                onChange={(event) => handleChange(event, index)}
                                style={{
                                    width: 160,
                                    padding: 3
                                }}
                            />
                            <Input
                                name="lastName"
                                placeholder="Last Name"
                                value={item.lastName}
                                onChange={(event) => handleChange(event, index)}
                                style={{
                                    width: 160,
                                    padding: 3
                                }}
                            />
                            {authors.length > 1 && (
                                <Button
                                    shape='circle'
                                    onClick={() => handleDeleteAAuthor(index)}
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
                    <TextArea rows={4} />

                    <label>URL</label>
                    <Input></Input>
                </div>
            </Space>
        </>
    )
}

export default InfoForm;