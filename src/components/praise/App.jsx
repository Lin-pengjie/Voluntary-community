// 引入属性校验包
import PropTypes from "prop-types";
import React, { useState } from 'react';
import { Space } from 'antd'
import { praise } from '@/apis/main'

export default function IconText(props) {
    //判断是否点赞过状态
    const [isShow, setisShow] = useState(false)
    const [text, settext] = useState(props.text)
    const handPraise = (id) => {
        if (isShow) { return }
        //如果已经点赞过，直接return
        if(props?.likedNewsIds && props?.likedNewsIds.includes(props.id)){return}
        settext(text + 1)
        setisShow(true)
        praise(id, {
            praise: props.text + 1
        })
        props.handlike(id)
    }
    
    return (
        <Space
            onClick={() => { handPraise(props.id) }}
            style={{ color: props?.likedNewsIds && props?.likedNewsIds.includes(props.id) ? "red" : ''|| isShow ? 'red' : '' }}
        >
            {React.createElement(props.icon)}
            {text}
        </Space>
    )
}

IconText.propTypes = {
    icon: PropTypes.elementType.isRequired,
    text: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    likedNewsIds: PropTypes.array.isRequired,
    handlike: PropTypes.func.isRequired,
};
