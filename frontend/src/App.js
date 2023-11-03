import React, { useState, useEffect } from 'react';
import { Input, Button, Typography, Table } from 'antd';
// import 'antd/dist/antd.css'; 

const { Title, Paragraph } = Typography;

const LOCALHOST = "http://127.0.0.1:8000";

function App() {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [expiration, setExpiration] = useState(0);
  const [result, setResult] = useState('');
  const [all_result, setAllResult] = useState([]);
  const [columns, setColumns] = useState([
    {
      title: 'Key',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
  ]);
  
  const [dataSource, setDataSource] = useState([]);
  
  const handleGetAll = () => {
    fetch(`${LOCALHOST}/getall`)
    .then((response) => response.json())
    .then((data) => {
    // console.log(data.keys);

      if (data.keys && data.values) {
        // console.log(data.keys);
        const keys = data.keys;
        const values = data.values;

        if (Array.isArray(keys) && Array.isArray(values) && keys.length === values.length) {
          const resultData = keys.map((key, index) => ({ key, value: values[index] }));
          setDataSource(resultData);
        } else {
          setDataSource([]);
          console.error('Keys and values do not match or are not arrays.');
        }
      } else {
        setDataSource([]);
        console.error('Keys and values are missing in the response.');
      }
    })
    .catch((error) => {
      setDataSource([]);
      console.error('Error:', error);
    });
};
  
  const handleGet = () => {
    fetch(`${LOCALHOST}/get?key=${key}`)
      .then(response => response.json())
      .then((data) => {
        if (data.value) {
          // If the key exists, set the result state
          setResult(data.value);
        } else {
          // If the key is not found, handle it accordingly
          setResult('Key not found');
        }
        });
  };

  const handleSet = () => {
    fetch(`${LOCALHOST}/set`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ key, value, expiration }),
    })
      .then(response => response.json())
      .then(data => {
        setResult(data.message);
      });
  };

  return (
    <div className="App" style={{padding:'10px', margin:'50px'}}>
      <Title style={{textAlign:'center'}}>LRU Cache</Title>
      <div style={{padding:'10px'}}>
        <Paragraph>
          <label>Key:</label>
          <Input value={key} onChange={(e) => setKey(e.target.value)} />
        </Paragraph>
        <Paragraph>
          <label>Value:</label>
          <Input value={value} onChange={(e) => setValue(e.target.value)} />
        </Paragraph>
        <Paragraph>
          <label>Expiration (in seconds):</label>
          <Input type="number" value={expiration} onChange={(e) => setExpiration(parseInt(e.target.value))} />
        </Paragraph>
      </div>
      <div style={{ padding: "10px", textAlign:'center'}}>
        <Button style={{ marginRight: '10px' }} type="primary" onClick={handleGet}>Get specific key</Button>
        <Button type="primary" onClick={handleSet}>Set</Button>
      </div>
      <div style={{ padding: "10px", textAlign:'center'}}><Button type="primary" onClick={handleGetAll}>Get all the list </Button></div>

      <div>
        <Title level={3}>Result:</Title>
        <Paragraph>{result}</Paragraph>

        <Table columns={columns} dataSource={dataSource} />
      </div>

    </div>
  );
}

export default App;
