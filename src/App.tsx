import React, { useState } from 'react';
import './App.css';
import { Flex, Typography } from 'antd';
import Keys from './components/Keys/Keys';
import CryptoCard from './components/CryptoCard/CryptoCard';

const { Title } = Typography;

function App() {
  const [key1, setKey1] = useState('')
  const [key2, setKey2] = useState('')

  return (
    <Flex vertical justify='flex-start' align='center' gap='large' style={{ margin: '20px 0px 50px 0px' }}>
      <Title>DESX Cryptography</Title>
      <Keys
        key1={key1}
        key2={key2}
        setKey1={setKey1}
        setKey2={setKey2}
      />
      <Flex justify='space-between' className='crypto-wrapper' gap='large'>
        <CryptoCard
          key1={key1}
          key2={key2}
          title='Encrypt'
          lock={true}
        />
        <CryptoCard
          key1={key1}
          key2={key2}
          title='Decrypt'
        />
      </Flex>
    </Flex>
  );
}

export default App;
