import { LeftCircleTwoTone, RightCircleTwoTone } from '@ant-design/icons';
import { Flex, Spin, Typography } from 'antd';
import { Observer } from 'mobx-react-lite';
import * as React from 'react';

import styles from './App.scss';
import AppVM from './App.vm';

const App: React.FC = () => {
    const vm = React.useMemo(() => new AppVM(), []);
    const elemRef = React.useRef<HTMLDivElement>(null);

    return (
        <Observer>
            {() => (
                <Flex id={`${styles.plumChromeExtensionBox}`} gap={4}>
                    <Flex align="baseline">
                        {vm.config?.isExpanded ? (
                            <RightCircleTwoTone
                                onClick={vm.toggleCollapsed}
                                style={{ fontSize: 30, cursor: 'pointer' }}
                            />
                        ) : (
                            <LeftCircleTwoTone
                                onClick={vm.toggleCollapsed}
                                style={{ fontSize: 30, cursor: 'pointer' }}
                            />
                        )}
                    </Flex>
                    {vm.config ? (
                        vm.config.isExpanded && (
                            <Flex vertical className={styles.codeBox}>
                                <div ref={elemRef}>
                                    <Flex gap={8} style={{ margin: '0 16px' }}>
                                        <Typography.Title style={{ fontSize: 18 }}>
                                            插件页面内容
                                        </Typography.Title>
                                    </Flex>
                                    <Flex vertical gap={4}>
                                        <Typography.Text>正文内容1</Typography.Text>
                                        <Typography.Text>正文内容2</Typography.Text>
                                        <Typography.Text>正文内容3</Typography.Text>
                                    </Flex>
                                </div>
                            </Flex>
                        )
                    ) : (
                        <Spin />
                    )}
                </Flex>
            )}
        </Observer>
    );
};

export default App;
