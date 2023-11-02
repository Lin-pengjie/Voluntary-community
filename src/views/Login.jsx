import LoginImg from "../assets/img/login.png"
import Style from "../assets/css/login.module.css"
import { Button, Space, Form, Input } from 'antd';
import { useNavigate } from "react-router";
const onFinish = (values) => {
    console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

export default function Login() {
    const navigate = useNavigate()

    return (
        <div className={Style.box}>
            <div className={Style.content}>
                <div className={Style.leftContent}>
                    <img src={LoginImg}></img>
                </div>
                <div className={Style.rightContent}>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="用户名"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Space>
                                <Button type="primary" htmlType="submit">登录</Button>
                                <Button onClick={() => {navigate("/sign")}}>去注册</Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}
