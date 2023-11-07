import LoginImg from "@/assets/img/login.png"
import Style from "@/assets/css/login.module.css"
import { Button, Space, Form, Input, message } from 'antd';
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { verifyUser } from '@/apis/loginApi'

export default function Login() {
    const navigate = useNavigate()
    const [data, setdata] = useState([])
    const [messageApi, contextHolder] = message.useMessage();

    const findUser = async (u, p) => {
        const res = await verifyUser(u, p)
        setdata(res.data)
    }

    //提交表单的时候验证
    const onFinish = (values) => {
        findUser(values.username, values.password)
        
    };
    const verify = () => {
        if (data.length !== 0) {
            const token = {
                username: data[0].username,
                password: data[0].password
            };
            localStorage.setItem("token", JSON.stringify(token));
            navigate('/home')
        } else {
            messageApi.open({
                type: 'error',
                content: 'This is an error message',
            });
        }
    }

    useEffect(() => {
        if (data.length > 0) {
            verify();
          }
    },[data])

    return (
        <div className={Style.box}>
            {contextHolder}
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
                                <Button onClick={() => { navigate("/sign") }}>去注册</Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}
