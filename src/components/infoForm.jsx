import React, { useEffect, useState } from 'react';
import { Space, Select, Input, Button, Row, DatePicker } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import citationData from '../data/citations';
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
    const sourceData = selectedSource.selectedSource;
    const [citation, setCitation] = useState(sourceData)
    const [authors, setAuthors] = useState(citation.authors);
    const [itemType, setItemType] = useState(citation.itemType);

    useEffect(() => {
        const citation = selectedSource.selectedSource
        setCitation(citation)
        setAuthors(citation.authors)
        setItemType(citation.itemType)
        console.log(citationData)
    }, [selectedSource, citationData])


    const handleItemTypeChange = (value) => {
        console.log(value);
        // console.log(sourceData.itemType);
        sourceData.itemType = value;
        console.log(citationData)
        setItemType(value);
    }

    const handleAddAuthor = () => {
    setAuthors([...authors, { firstName: "", lastName: "" }]);
    };

    const handleChange = (event, index) => {
    let { name, value } = event.target;
    let onChangeValue = [...authors];
    onChangeValue[index][name] = value;
    setAuthors(onChangeValue);
    };

    const handleDeleteAAuthor = (index) => {
    const newArray = [...authors];
    newArray.splice(index, 1);
    setAuthors(newArray);
    };

    const handleDateChange = (date, dateString) => {
    console.log(date, dateString);
    };

    return(
        <>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <div>
                <label>Title</label>
                <Input 
                    name='title'
                    value={sourceData.title}
                    placeholder='title'
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