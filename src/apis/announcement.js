import axios from "@/util/axiosUtil"

//请求公告数据api
export const announcement = () => {
    return axios("/announcement")
}

//请求用户数据
export const findUser = (usename, password) => {
    return axios(`/OldUser?username=${usename}&password=${password}`)
}