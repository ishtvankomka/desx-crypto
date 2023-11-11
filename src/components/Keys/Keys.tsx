import React from 'react';
import './KeysStyles.css';
import { Button, Card, Divider, Flex, Input, Typography } from 'antd';
import { KeyOutlined } from '@ant-design/icons';
import { generateKey } from '../../services/keyGen';
const { Text } = Typography;

interface KeysProps {
    key1?: string
    key2?: string
    setKey1?: (value: string) => void
    setKey2?: (value: string) => void
}

const Keys: React.FC<KeysProps> = ({ key1 = '', key2 = '', setKey1 = () => { }, setKey2 = () => { }, }) => {

    const handleGenerateKey1 = () => setKey1(generateKey())
    const handleGenerateKey2 = () => setKey2(generateKey())

    return (
        <Card
            title='Encryption keys'
            className='card keys'
            extra={
                <KeyOutlined
                    style={{ marginLeft: '20px' }}
                />
            }
        >
            <Flex vertical>
                <Flex vertical gap='small'>
                    <Text strong>Key 1</Text>
                    <Flex gap='middle'>
                        <Input
                            value={key1}
                            onChange={(e) => setKey1(e.target.value)}
                        />
                        <Button
                            type='primary'
                            onClick={handleGenerateKey1}
                        >
                            Generate
                        </Button>
                    </Flex>
                </Flex>
                <Divider />
                <Flex vertical gap='small'>
                    <Text strong>Key 2</Text>
                    <Flex gap='middle'>
                        <Input
                            value={key2}
                            onChange={(e) => setKey2(e.target.value)}
                        />
                        <Button
                            type='primary'
                            onClick={handleGenerateKey2}
                        >
                            Generate
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </Card>
    );
}

export default Keys;