import { Input, Modal } from 'antd';
import Style from './App.module.css'
import { UserOutlined, CommentOutlined, BarsOutlined } from '@ant-design/icons';
import { Avatar, Button, Popover, ConfigProvider } from 'antd';
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

export default function App(props) {
    const navigate = useNavigate()
    const messageContainerRef = useRef(null);
    //选择的用户id
    const [userInfo, setuserInfo] = useState([])
    const user = props.user[0]
    //获取输入框的内容
    const [text, settext] = useState()
    //点击发送回调
    const clickSend = () => {
        if (!text) return
        props.AcquireMessage({
            fromUser: user.username,
            toUser: userInfo.username,
            msg: text,
            dateTime: new Date().getTime()
        }, userInfo.id)
        settext('')
    }

    //当聊天数据更新时，自动上滑
    useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [props.messageBox]);

    return (
        <Modal width={800} style={{ minWidth: "700px" }}  open={props.open} onCancel={() => { props.CancelOpen(false) }} footer={null}>
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
                            <Popover
                                placement="top"
                                content={
                                    <Button danger onClick={() => {
                                        localStorage.removeItem('token')
                                        navigate('/login')
                                        props.aaa()
                                    }}>
                                        退出
                                    </Button>
                                }
                                trigger="click"
                            >
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
                                <div className={Style.chat_c}>
                                    {
                                        //过虑出当前聊天界面的用户信息
                                        props.messageBox.filter(item => {
                                            return item.fromUser === userInfo.username || item.toUser === userInfo.username
                                        }).map(item => {
                                            return (
                                                <div key={item.dateTime} className={Style.Message} ref={messageContainerRef}>
                                                    <div className={Style.Message_t}>
                                                        <Avatar
                                                            size={42}
                                                            className={item.fromUser === user.username ? Style.Avatar1 : Style.Avatar0}
                                                        >
                                                            {item.fromUser}
                                                        </Avatar>
                                                        <div className={Style.Time}>
                                                            {new Date(item.dateTime).toLocaleString()}
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={
                                                            `${item.fromUser === user.username ? Style.Content1 : Style.Content0} ${Style.Content}`
                                                        }
                                                    >
                                                        {item.msg}
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className={Style.chat_b}>
                                    <Input
                                        placeholder="请输入"
                                        className={Style.chat_b_INPUT}
                                        onChange={(e) => { settext(e.target.value) }}
                                        value={text}
                                    />
                                    <Button
                                        className={Style.chat_b_BUTTON}
                                        onClick={() => { clickSend() }}
                                    >
                                        发送
                                    </Button>
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
    AcquireMessage: PropTypes.func.isRequired,
    messageBox: PropTypes.array.isRequired,
    aaa: PropTypes.func.isRequired,
};