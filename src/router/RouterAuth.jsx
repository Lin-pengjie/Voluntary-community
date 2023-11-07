import { useState, useEffect } from "react";
import { Navigate } from "react-router";
import axios from 'axios'
import PropTypes from 'prop-types';
import { Space, Spin } from "antd";

export default function RouterAuth({ children }) {
    const [data, setdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // 获取本地token
    const token = JSON.parse(localStorage.getItem("token"));

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8000/OldUser", {
                params: {
                    username: token.username,
                    password: token.password
                }
            });
            setdata(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchData();
        } else {
            setIsLoading(false);
        }
    }, []);

    if (isLoading) {
        return <Space
            direction="vertical"
            style={{
                width: '100%',
            }}
        >
            <Spin tip="Loading" size="large">
                <div style={{ padding: "50px", background: 'rgba(0, 0, 0, 0.05)', borderRadius: "4px" }} />
            </Spin>
        </Space>
    }

    if (!token || data.length === 0) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
}

// 对组件的 props 进行验证
RouterAuth.propTypes = {
    children: PropTypes.node.isRequired
};