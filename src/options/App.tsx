import { Button, Form, message, Spin, Switch, Typography } from 'antd';
import { Observer } from 'mobx-react-lite';
import * as React from 'react';

import { VERSION } from '@/utils';

import OptionsSettingsVM from './App.vm';

import './App.scss';

const App: React.FC = () => {
    const vm = React.useMemo(() => new OptionsSettingsVM(), []);

    const [messageApi, contextHolder] = message.useMessage();
    const handleSubmit = React.useCallback(
        (values: Record<string, any>) => {
            vm.handleSubmit(values);
            messageApi.open({
                type: 'success',
                content: '保存成功',
            });
        },
        [vm],
    );

    return (
        <Observer>
            {() =>
                vm.initialized && !!vm.config ? (
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        onFinish={handleSubmit}
                        autoComplete="off"
                    >
                        <Form.Item label="版本">
                            <Typography.Text>{VERSION}</Typography.Text>
                        </Form.Item>
                        <Form.Item
                            label="默认显示插件"
                            name="isExpanded"
                            initialValue={vm.config.isExpanded}
                            valuePropName="checked"
                        >
                            <Switch />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                            {contextHolder}
                            <Button type="primary" htmlType="submit">
                                保存
                            </Button>
                        </Form.Item>
                    </Form>
                ) : (
                    <Spin />
                )
            }
        </Observer>
    );
};

export default App;
