import axios from 'axios'

const NewAxios = axios.create({
    baseURL:"http://localhost:8000",
    timeout:5000
})

export default NewAxios