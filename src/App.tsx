import React from 'react';
import logo from './logo.svg';
import './App.css';
import { bytesToString, stringToBytes } from './helpers/bytes';
import { desx } from './services/desxCrypto';
import { generateKey } from './services/keyGen';


function App() {
  const plainText = 'apple pie';
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



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
