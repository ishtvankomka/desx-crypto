import React, { useState } from 'react';
import './App.css';
import { Flex, Typography } from 'antd';
import Keys from './components/Keys/Keys';
import CryptoCard from './components/CryptoCard/CryptoCard';

const { Title } = Typography;

function App() {
  /* const plainText = 'ddd daddy senior react';
  const key = generateKey();
  const tweak = generateKey();

  console.log('key:', key);
  console.log('tweak:', tweak);


  const plainTextBytes = stringToBytes(plainText);
  const keyBytes = stringToBytes(key);
  const tweakBytes = stringToBytes(tweak);

  console.log('Text to encrypt:', plainText);
  console.log('Bytes to encrypt:', plainTextBytes);

  const encryptedBytes = desx(plainTextBytes, keyBytes, tweakBytes);
  console.log('Encrypted Bytes:', encryptedBytes);
  console.log('Encrypted Text:', bytesToString(encryptedBytes));

  const decryptedBytes = desx(encryptedBytes, keyBytes, tweakBytes);
  console.log('Decrypted Bytes:', decryptedBytes);

  const decryptedText = bytesToString(decryptedBytes);
  console.log('Decrypted Text:', decryptedText);
 */

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
