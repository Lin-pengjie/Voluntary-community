import { Card, Drawer, Descriptions, Tag, Col, Statistic } from 'antd';
const { Countdown } = Statistic;
import { ZoomInOutlined } from '@ant-design/icons';
import { useState } from 'react';
import Image1 from '@/assets/img/yue.png';
// 引入属性校验包
import PropTypes from "prop-types";

const tag = [
    {
        color: "red",
        text: "报名中",
        value: "距离报名结束"
    },
    {
        color: "green",
        text: "进行中",
        value: "距离活动结束"
    },
]

// 属性验证
App.propTypes = {
    title: PropTypes.string,
    list: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            activityName: PropTypes.string,
            activityArea: PropTypes.string,
            activityStatus: PropTypes.number,
            activityContent: PropTypes.string,
            startTime: PropTypes.number,
            endTime: PropTypes.number
        })
    )
}

export default function App(props) {
    const { title, list } = props;
    const [open, setOpen] = useState(false);
    const [cur, setcur] = useState(0)
    const startTime = list[cur].startTime;
    const endTime = list[cur].endTime;
    const showDrawer = (index) => {
        setOpen(true);
        setcur(index)
    };
    const onClose = () => {
        setOpen(false);
    };

    const EventDetails = [
        {
            key: '1',
            label: '活动',
            children: list[cur].activityName,
        },
        {
            key: '2',
            label: '活动地区',
            children: list[cur].activityArea,
        },
        {
            key: '3',
            label: '活动状态',
            children: <Tag color={tag[list[cur].activityStatus].color} style={{ margin: "5px" }}>{tag[list[cur].activityStatus].text}</Tag>,
        },
        {
            key: '4',
            label: '活动内容',
            children: list[cur].activityContent,
        },
    ]

    return (
        <>
            <Card title={title}>
                {list.map((data, index) => {
                    return (
                        <Card
                            key={data.id}
                            type="inner"
                            title={data.activityName}
                            style={{ marginTop: "16px" }}
                            extra={
                                <ZoomInOutlined
                                    style={{ fontSize: "30px", color: '#ff4d4f' }}
                                    onClick={() => showDrawer(index)}
                                />
                            }
                        >
                            {data.activityContent}
                        </Card>
                    );
                })}
            </Card>

            <Drawer placement="right" onClose={onClose} open={open} width={'70%'}>
                <div>
                    <img src={Image1} style={{ width: "30%", margin: "auto", display: "block", height: "30vh" }}></img>
                </div>
                <Descriptions
                    items={EventDetails}
                    column={3}
                    contentStyle={{ fontSize: "20px" }}
                    labelStyle={{ fontSize: "20px" }}
                />
                <Col
                    span={24}
                    style={{
                        marginTop: 32,
                    }}
                >
                    <Countdown
                        title={tag[list[cur].activityStatus].value}
                        value={list[cur].activityStatus === 0 ? startTime : endTime}
                        format="D 天 H 时 m 分 s 秒"
                    />
                </Col>
            </Drawer>
        </>
    );
}