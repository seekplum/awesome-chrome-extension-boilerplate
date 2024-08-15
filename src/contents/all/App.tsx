import { LeftCircleTwoTone, RightCircleTwoTone } from '@ant-design/icons';
import { Flex, Spin, Typography } from 'antd';
import { Observer } from 'mobx-react-lite';
import * as React from 'react';

import styles from './App.scss';
import AppVM from './App.vm';

const App: React.FC = () => {
    const [tipsHeight, setTipsHeight] = React.useState(105);

    const vm = React.useMemo(() => new AppVM(), []);
    const elemRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (elemRef.current) {
            setTipsHeight(elemRef.current.clientHeight);
        }
    }, [elemRef]);

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
                                <div ref={elemRef} style={{ marginBottom: 16 }}>
                                    <Flex
                                        gap={8}
                                        style={{ margin: '0 16px' }}
                                        justify="center"
                                        align="center"
                                    >
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
                                <Flex vertical gap={4}>
                                    <Flex gap={12} style={{ height: tipsHeight }}>
                                        <Typography.Text>
                                            扩展模块..., 上方内容高度: {tipsHeight}px
                                        </Typography.Text>
                                    </Flex>
                                </Flex>
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
