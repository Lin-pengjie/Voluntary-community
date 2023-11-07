import { Modal } from 'antd';
import Style from './App.module.css'
import { UserOutlined, CommentOutlined, BarsOutlined } from '@ant-design/icons';
import { Avatar, Button, Popover, ConfigProvider } from 'antd';
import { useState } from 'react';
import PropTypes from "prop-types";

const navButton = [
    {
        key: 0,
        icon: <CommentOutlined style={{ fontSize: "2em" }} />,
    },
    {
        key: 1,
        icon: <UserOutlined style={{ fontSize: "2em" }} />,
    },
]

export default function App(props) {
    const [selectedButton, setselectedButton] = useState(0)
    const user = props.user[0]
    return (
        <Modal width={800} centered={true} open={props.open} onCancel={() => {props.CancelOpen(false) }} footer={null}>
            <ConfigProvider
                theme={{
                    token: {
                        // Seed Token，影响范围大
                        colorPrimary: '#ffffff',
                        borderRadius: 2,

                        // 派生变量，影响范围小
                        colorBgContainer: '#141414',
                    },
                }}
            >
                <div className={Style.Box}>
                    <div className={Style.box}>
                        <div className={Style.navTop}>
                            <Avatar
                                shape="square"
                                size={78}
                                icon={<UserOutlined style={{ color: 'black' }} />}
                                className={Style.Avatar}
                                src={user?.avatar}
                            />
                            <div>
                                {
                                    navButton.map(item => {
                                        return (
                                            <Button
                                                key={item.key}
                                                size="large"
                                                ghost
                                                className={Style.navButton}
                                                onClick={() => setselectedButton(item.key)}
                                            >
                                                <span className={Style.icon} style={{ color: selectedButton === item.key ? 'rgb(255, 255, 255)' : '' }}>
                                                    {item.icon}
                                                </span>
                                                {item.label}
                                            </Button>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        <div className={Style.navBottom}>
                            <Popover placement="top" content={<Button danger>退出</Button>} trigger="click">
                                <Button
                                    icon={<BarsOutlined style={{ fontSize: '2em' }} />}
                                    size="large"
                                    ghost
                                    className={Style.navButton}
                                />
                            </Popover>
                        </div>
                    </div>
                    <div style={{ flex: "3", background: '#ffccc7' }}></div>
                    <div style={{ flex: "8", background: '#fff1f0' }}></div>
                </div>
            </ConfigProvider>
        </Modal>
    )
}

App.propTypes = {
    open: PropTypes.bool.isRequired,
    CancelOpen:PropTypes.func.isRequired,
    user:PropTypes.array.isRequired,
};