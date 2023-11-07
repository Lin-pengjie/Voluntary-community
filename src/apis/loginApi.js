import axios from "@/util/axiosUtil"

export const verifyUser = (usename, password) => {
    return axios(`/OldUser?username=${usename}&password=${password}`)
}