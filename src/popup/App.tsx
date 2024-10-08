import { Flex, Typography } from 'antd';
import * as React from 'react';

import { ControlList } from './components';

const App: React.FC = () => {
    return (
        <Flex style={{ width: 176, boxSizing: 'border-box', padding: '12px 0' }}>
            <Flex vertical gap={12} style={{ width: '100%' }}>
                <Flex align="center" gap={8} style={{ margin: '0 16px' }}>
                    <Typography.Title style={{ fontSize: 18 }}>XXXX</Typography.Title>
                </Flex>
                <ControlList />
            </Flex>
        </Flex>
    );
};

export default App;
