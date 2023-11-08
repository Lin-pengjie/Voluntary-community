import { Input, Modal } from 'antd';
import Style from './App.module.css'
import { UserOutlined, CommentOutlined, BarsOutlined } from '@ant-design/icons';
import { Avatar, Button, Popover, ConfigProvider } from 'antd';
import PropTypes from "prop-types";
import { useState } from 'react';

export default function App(props) {
    //选择的用户id
    const [userInfo, setuserInfo] = useState([])
    const user = props.user[0]
    return (
        <Modal width={800} style={{ minWidth: "700px" }} centered={true} open={props.open} onCancel={() => { props.CancelOpen(false) }} footer={null}>
            <ConfigProvider
                theme={{
                    token: {
                        // Seed Token，影响范围大
                        colorPrimary: '#ffffff',
                        borderRadius: 2,

                        // 派生变量，影响范围小
                        colorBgContainer: '#ffffff',
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
                                <Button size="large" ghost className={Style.navButton} >
                                    <CommentOutlined style={{ fontSize: "2em" }} />
                                </Button>
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
                    <div style={{ flex: "3", background: '#ffccc7' }}>
                        {
                            props.onlineUser.map(item => {
                                return (
                                    <div
                                        className={item.id !== userInfo.id ? Style.list : Style.clicklist}
                                        key={item.id}
                                        onClick={() => {
                                            console.log(item)
                                            setuserInfo(item)
                                        }}
                                    >
                                        <div className={Style.list_l}>
                                            <img className={Style.list_l_img} src={item.useravatar}></img>
                                        </div>
                                        <div className={Style.list_r}>{item.username}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div style={{ flex: "8", background: '#fff1f0' }}>
                        {
                            Object.keys(userInfo).length > 0 && <div className={Style.chat}>
                                <div className={Style.chat_t}>
                                    {userInfo.username}
                                </div>
                                <div className={Style.chat_c}></div>
                                <div className={Style.chat_b}>
                                    <Input placeholder="请输入" className={Style.chat_b_INPUT} />
                                    <Button className={Style.chat_b_BUTTON}>发送</Button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </ConfigProvider>
        </Modal >
    )
}

App.propTypes = {
    open: PropTypes.bool.isRequired,
    CancelOpen: PropTypes.func.isRequired,
    user: PropTypes.array.isRequired,
    onlineUser: PropTypes.array.isRequired,
};