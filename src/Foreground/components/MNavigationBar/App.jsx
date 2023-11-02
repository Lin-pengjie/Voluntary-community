import Style from './App.module.css'
import { UserOutlined, CommentOutlined, BarsOutlined } from '@ant-design/icons';
import { Avatar, Button, Popover } from 'antd';

const navButton = [
    {
        key: '',
        icon: <CommentOutlined style={{ fontSize: "2em" }} />,
    },
    {
        key: '',
        icon: <UserOutlined style={{ fontSize: "2em" }} />,
    },
]

export default function App() {
    return (
        <div className={Style.box}>
            <div className={Style.navTop}>
                <Avatar
                    shape="square"
                    size={78}
                    icon={<UserOutlined style={{ color: 'black' }} />}
                    className={Style.Avatar}
                />
                <div>
                    {
                        navButton.map(item => {
                            return (
                                <Button
                                    key={item.key}
                                    size="large"
                                    icon={item.icon}
                                    ghost
                                    className={Style.navButton}
                                />
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
    )
}
