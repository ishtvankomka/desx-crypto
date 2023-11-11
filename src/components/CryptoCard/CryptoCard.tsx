import React, { useEffect, useState } from 'react';
import './CryptoCardStyles.css';
import { Button, Card, Collapse, Flex, Input, Typography } from 'antd';
import { LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { desx } from '../../services/desxCrypto';
import { bytesToString, stringToBytes } from '../../helpers/bytes';

const { Text } = Typography;
const { TextArea } = Input;

interface CryptoCardProps {
    title?: string
    lock?: boolean
    key1?: string
    key2?: string
}

const CryptoCard: React.FC<CryptoCardProps> = ({ title = '', lock = false, key1 = '', key2 = '' }) => {
    const [inputText, setInputText] = useState('')
    const [inputBytes, setInputBytes] = useState('')
    useEffect(() => {
        setInputBytes(String(stringToBytes(inputText)))
    }, [inputText])

    const [outputText, setOutputText] = useState('')
    const [outputBytes, setOutputBytes] = useState('')
    useEffect(() => {
        setOutputBytes(String(stringToBytes(outputText)))
    }, [outputText])


    const handleDesx = () => {
        const crypted = desx(stringToBytes(inputText), stringToBytes(key1), stringToBytes(key2))
        setOutputText(bytesToString(crypted))
    }

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(outputText)
    }


    return (
        <Card
            title={`DESX ${title}`}
            className='crypto-card'
            extra={
                lock ?
                    <LockOutlined />
                    :
                    <UnlockOutlined />
            }
        >
            <Flex vertical gap='large'>
                <Flex vertical gap='small'>
                    <Text strong>Input text</Text>
                    <TextArea
                        placeholder={`Enter text to ${title}`}
                        autoSize={{ minRows: 6, maxRows: 6 }}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                    />
                </Flex>
                <Collapse
                    items={[{
                        key: '1',
                        label: 'Bytes (input)',
                        children: (
                            <TextArea
                                autoSize={{ minRows: 6, maxRows: 6 }}
                                disabled
                                style={{ cursor: 'auto' }}
                                value={inputBytes}
                            />
                        )
                    }]}
                />
                <Button
                    type='primary'
                    onClick={handleDesx}
                    disabled={!(inputText.length && key1.length && key2.length)}
                >
                    {title}
                </Button>
                <Flex vertical gap='middle'>
                    <Flex>
                        <Text strong>Output text</Text>
                        <Button
                            type='default'
                            size='small'
                            onClick={handleCopyToClipboard}
                            disabled={!(outputText.length)}
                            style={{ marginLeft: '20px' }}
                        >
                            Copy
                        </Button>
                    </Flex>
                    <TextArea
                        autoSize={{ minRows: 6, maxRows: 6 }}
                        disabled
                        style={{ cursor: 'pointer' }}
                        value={outputText}
                        onChange={(e) => setOutputText(e.target.value)}
                    />
                </Flex>
                <Collapse
                    items={[{
                        key: '1',
                        label: 'Bytes (output)',
                        children: (
                            <TextArea
                                autoSize={{ minRows: 6, maxRows: 6 }}
                                disabled
                                style={{ cursor: 'auto' }}
                                value={outputBytes}
                            />
                        )
                    }]}
                />
            </Flex>
        </Card>
    );
}

export default CryptoCard;
